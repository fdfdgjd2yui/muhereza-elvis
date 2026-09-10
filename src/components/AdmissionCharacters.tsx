import React, { useEffect, useState, useRef } from 'react';
import { AlertTriangle, Sparkles } from 'lucide-react';

export type AdmissionCharacterState =
  | 'idle'
  | 'nameFocused'
  | 'dateFocused'
  | 'programFocused'
  | 'boardingFocused'
  | 'guardianFocused'
  | 'phoneFocused'
  | 'emailFocused'
  | 'uploadFocused'
  | 'invalid'
  | 'hurt'
  | 'submitting'
  | 'success';

interface AdmissionCharactersProps {
  state: AdmissionCharacterState;
  variant?: 'horizontal' | 'sidebar';
  typingTrigger?: number; // increments on every keystroke in any field
}

interface StateDetails {
  message: string;
  fieldPupilOffset: { x: number; y: number };
  basePipTilt: number;
  baseKokoTilt: number;
  baseMiloTilt: number;
  expression: 'normal' | 'curious' | 'focused' | 'concerned' | 'thinking' | 'celebrate' | 'hurt';
}

interface BallBounceState {
  jumpY: number;
  scaleX: number;
  scaleY: number;
  squint: boolean;
  shadowScale: number;
  shadowOpacity: number;
}

const defaultBounce: BallBounceState = {
  jumpY: 0,
  scaleX: 1,
  scaleY: 1,
  squint: false,
  shadowScale: 1,
  shadowOpacity: 0.35,
};

export const AdmissionCharacters: React.FC<AdmissionCharactersProps> = ({
  state,
  variant = 'horizontal',
  typingTrigger = 0,
}) => {
  // Cursor & mobile touch tracking
  const [pointerOffset, setPointerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [pointerLean, setPointerLean] = useState<number>(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSquishing, setIsSquishing] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Ball bounce physics state per character
  const [isTypingActive, setIsTypingActive] = useState(false);
  const [pipBounce, setPipBounce] = useState<BallBounceState>(defaultBounce);
  const [kokoBounce, setKokoBounce] = useState<BallBounceState>(defaultBounce);
  const [miloBounce, setMiloBounce] = useState<BallBounceState>(defaultBounce);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastTypingTimeRef = useRef<number>(0);
  const bounceStartTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Periodic natural blinking (only when not in typing bounce or hurt)
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (state !== 'hurt' && !isTypingActive) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 140);
      }
    }, 3200 + Math.random() * 2200);

    return () => clearInterval(blinkInterval);
  }, [state, isTypingActive]);

  // When any field is touched / focused, trigger a playful character shake
  useEffect(() => {
    if (state !== 'idle' && state !== 'hurt') {
      setIsShaking(true);
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [state]);

  // Pointer tracking for desktop mouse cursor and mobile thumb touch
  useEffect(() => {
    const handlePointer = (e: MouseEvent | TouchEvent | PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      } else {
        return;
      }

      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const dist = Math.hypot(dx, dy) || 1;
      const angle = Math.atan2(dy, dx);

      const travel = Math.min(1, dist / 150);
      const maxPupilX = 11.5;
      const maxPupilY = 8.5;

      const nx = Math.cos(angle) * maxPupilX * Math.max(0.25, travel);
      const ny = Math.sin(angle) * maxPupilY * Math.max(0.25, travel);

      const viewportHalfWidth = (window.innerWidth || 800) / 2;
      const lean = Math.max(-8, Math.min(8, (dx / viewportHalfWidth) * 10));

      setPointerOffset({ x: nx, y: ny });
      setPointerLean(lean);
    };

    window.addEventListener('mousemove', handlePointer, { passive: true });
    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('pointerdown', handlePointer, { passive: true });
    window.addEventListener('touchstart', handlePointer, { passive: true });
    window.addEventListener('touchmove', handlePointer, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointer);
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('pointerdown', handlePointer);
      window.removeEventListener('touchstart', handlePointer);
      window.removeEventListener('touchmove', handlePointer);
    };
  }, []);

  // Click / tap squish & shake reaction
  const handleCharacterClick = () => {
    setIsSquishing(true);
    setIsShaking(true);
    setTimeout(() => {
      setIsSquishing(false);
      setIsShaking(false);
    }, 450);
  };

  // -------------------------------------------------------------
  // BALL BOUNCING PHYSICS ENGINE ON TYPING IN ANY FIELD
  // "on typing in any field they should be bouncing up and down
  //  simulate a ball bouncing physics and when they land on ground
  //  they squit eyes then if they jump again or bounce they open eyes open"
  // -------------------------------------------------------------
  useEffect(() => {
    if (typingTrigger === 0) return;

    lastTypingTimeRef.current = performance.now();
    if (!isTypingActive) {
      bounceStartTimeRef.current = performance.now();
      setIsTypingActive(true);
    }
  }, [typingTrigger]);

  useEffect(() => {
    if (!isTypingActive) return;

    const T = 380; // Period of bounce in ms

    const computeBounce = (elapsed: number, offsetMs: number): BallBounceState => {
      const time = elapsed + offsetMs;
      const phase = ((time % T) + T) % T / T; // 0 to 1

      // 0.00 to 0.64: Airborne (ascending launch -> apex peak -> descending gravity fall)
      // 0.64 to 1.00: Ground Impact (landing contact -> compression squash -> rebound)
      if (phase < 0.64) {
        const u = phase / 0.64; // 0 to 1
        const h = 4 * u * (1 - u); // Parabolic gravity curve, max 1.0 at u = 0.5
        const jumpY = -34 * h; // -34px peak height
        const scaleY = 1 + 0.30 * h; // Dynamic vertical stretch in flight
        const scaleX = 1 - 0.16 * h; // Horizontal stretch thinning
        return {
          jumpY,
          scaleX,
          scaleY,
          squint: false, // EYES WIDE OPEN IN JUMP / AIR!
          shadowScale: Math.max(0.4, 1 - 0.55 * h),
          shadowOpacity: Math.max(0.12, 0.4 - 0.28 * h),
        };
      } else {
        const v = (phase - 0.64) / 0.36; // 0 to 1
        const s = Math.sin(v * Math.PI); // Sinusoidal compression squash curve
        const jumpY = 0; // Impact flat on ground
        const scaleY = 1 - 0.36 * s; // Ground impact squash
        const scaleX = 1 + 0.36 * s; // Ground impact spread
        return {
          jumpY,
          scaleX,
          scaleY,
          squint: true, // SQUINT EYES ON GROUND LANDING!
          shadowScale: 1 + 0.45 * s,
          shadowOpacity: 0.45 + 0.35 * s,
        };
      }
    };

    const tick = (now: number) => {
      const elapsed = now - bounceStartTimeRef.current;
      const timeSinceLastType = now - lastTypingTimeRef.current;

      // Stop bouncing if user stopped typing for > 650ms and current cycle completed
      if (timeSinceLastType > 650) {
        const currentPhase = (elapsed % T) / T;
        if (currentPhase < 0.1 || currentPhase > 0.9) {
          setIsTypingActive(false);
          setPipBounce(defaultBounce);
          setKokoBounce(defaultBounce);
          setMiloBounce(defaultBounce);
          return;
        }
      }

      // Compute bounce physics for each character with responsive harmonic offsets
      setPipBounce(computeBounce(elapsed, 0));
      setKokoBounce(computeBounce(elapsed, 65));
      setMiloBounce(computeBounce(elapsed, 130));

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isTypingActive]);

  // Derive visual configuration based on active form state
  const config: StateDetails = (() => {
    switch (state) {
      case 'nameFocused':
        return {
          message: "Scholar's Full Name",
          fieldPupilOffset: { x: -6, y: 2 },
          basePipTilt: -4,
          baseKokoTilt: -3,
          baseMiloTilt: -5,
          expression: 'curious'
        };
      case 'dateFocused':
        return {
          message: 'Date of Birth',
          fieldPupilOffset: { x: -5, y: 6 },
          basePipTilt: -3,
          baseKokoTilt: -5,
          baseMiloTilt: 3,
          expression: 'focused'
        };
      case 'programFocused':
        return {
          message: 'Academic Program Choice',
          fieldPupilOffset: { x: -7, y: -2 },
          basePipTilt: 4,
          baseKokoTilt: 5,
          baseMiloTilt: -3,
          expression: 'curious'
        };
      case 'boardingFocused':
        return {
          message: 'Boarding Preference',
          fieldPupilOffset: { x: -6, y: 3 },
          basePipTilt: -3,
          baseKokoTilt: 3,
          baseMiloTilt: -4,
          expression: 'normal'
        };
      case 'guardianFocused':
        return {
          message: 'Parent / Guardian Full Name',
          fieldPupilOffset: { x: -6, y: 2 },
          basePipTilt: -4,
          baseKokoTilt: -3,
          baseMiloTilt: -5,
          expression: 'focused'
        };
      case 'phoneFocused':
        return {
          message: 'Parent Contact Number',
          fieldPupilOffset: { x: -7, y: 4 },
          basePipTilt: -5,
          baseKokoTilt: -4,
          baseMiloTilt: -6,
          expression: 'focused'
        };
      case 'emailFocused':
        return {
          message: 'Parent Gmail Address',
          fieldPupilOffset: { x: -6, y: 1 },
          basePipTilt: -4,
          baseKokoTilt: 4,
          baseMiloTilt: -3,
          expression: 'curious'
        };
      case 'uploadFocused':
        return {
          message: 'Attach Academic Transcript',
          fieldPupilOffset: { x: -3, y: 7 },
          basePipTilt: 5,
          baseKokoTilt: 6,
          baseMiloTilt: 4,
          expression: 'curious'
        };
      case 'hurt':
        return {
          message: 'Ouch! Required fields are empty!',
          fieldPupilOffset: { x: 0, y: 0 },
          basePipTilt: -7,
          baseKokoTilt: 8,
          baseMiloTilt: -8,
          expression: 'hurt'
        };
      case 'invalid':
        return {
          message: 'Please review highlighted field',
          fieldPupilOffset: { x: 0, y: 3 },
          basePipTilt: -6,
          baseKokoTilt: 7,
          baseMiloTilt: -7,
          expression: 'concerned'
        };
      case 'submitting':
        return {
          message: 'Submitting application...',
          fieldPupilOffset: { x: 3, y: -5 },
          basePipTilt: 3,
          baseKokoTilt: -3,
          baseMiloTilt: 4,
          expression: 'thinking'
        };
      case 'success':
        return {
          message: 'Application Submitted!',
          fieldPupilOffset: { x: 0, y: 0 },
          basePipTilt: 0,
          baseKokoTilt: -4,
          baseMiloTilt: 4,
          expression: 'celebrate'
        };
      case 'idle':
      default:
        return {
          message: 'Admissions Companion',
          fieldPupilOffset: { x: 0, y: 0 },
          basePipTilt: 0,
          baseKokoTilt: 0,
          baseMiloTilt: 0,
          expression: 'normal'
        };
    }
  })();

  const { expression, message, basePipTilt, baseKokoTilt, baseMiloTilt } = config;

  const isFieldActive = state !== 'idle' && state !== 'hurt';
  const isHurtState = state === 'hurt';

  const combinedPupilOffset = {
    x: !isFieldActive
      ? pointerOffset.x
      : config.fieldPupilOffset.x * 0.5 + pointerOffset.x * 0.6,
    y: !isFieldActive
      ? pointerOffset.y
      : config.fieldPupilOffset.y * 0.5 + pointerOffset.y * 0.6
  };

  const safePupilX = Math.max(-11.5, Math.min(11.5, combinedPupilOffset.x));
  const safePupilY = Math.max(-8.5, Math.min(8.5, combinedPupilOffset.y));

  // Height stretch when a field is focused (if not ball-bouncing)
  const stretchTransform = isFieldActive || isSquishing
    ? 'scaleY(1.22) scaleX(0.97) translateY(-8px)'
    : 'scaleY(1) scaleX(1) translateY(0)';

  // -------------------------------------------------------------
  // 1. PIP: THE PURPLE SQUARE (Exact hero companion)
  // -------------------------------------------------------------
  const renderPip = (sizeClass = 'w-24 h-24') => {
    const leftEyeCx = 43;
    const rightEyeCx = 77;
    const eyeCy = 38;
    const eyeR = 21;

    const pLeftX = leftEyeCx + safePupilX;
    const pLeftY = eyeCy + safePupilY;
    const pRightX = rightEyeCx + safePupilX;
    const pRightY = eyeCy + safePupilY;

    const totalTilt = basePipTilt + pointerLean * 0.8;

    // Transform combination: If bouncing, ball bounce physics governs translateY & scale;
    // otherwise static posture and shake
    const currentTransform = isTypingActive
      ? `translateY(${pipBounce.jumpY}px) scaleX(${pipBounce.scaleX}) scaleY(${pipBounce.scaleY}) rotate(${totalTilt}deg)`
      : `rotate(${totalTilt}deg) ${stretchTransform}`;

    return (
      <div className="relative flex flex-col items-center">
        <div
          onClick={handleCharacterClick}
          onTouchStart={handleCharacterClick}
          className={`relative ${sizeClass} cursor-pointer select-none transition-transform duration-75 ease-out active:scale-95 ${
            isHurtState
              ? 'animate-hurt-shake'
              : isShaking
              ? 'animate-character-shake'
              : ''
          }`}
          style={{
            transform: currentTransform,
            transformOrigin: 'bottom center'
          }}
          title={isHurtState ? "Pip - Ouch! Missing field!" : "Pip - Tap to shake!"}
        >
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full overflow-visible drop-shadow-md"
            aria-hidden="true"
          >
            {/* Main Purple Square Body */}
            <rect
              x="8"
              y="8"
              width="104"
              height="104"
              rx="14"
              ry="14"
              fill="#9F6CD9"
              stroke="#0B0B0B"
              strokeWidth="7"
              strokeLinejoin="round"
            />

            {/* HURT FACE: Cartoon bandaid on forehead */}
            {isHurtState && (
              <g transform="translate(42, 10) rotate(-14)">
                <rect x="0" y="0" width="36" height="15" rx="5" fill="#FED7AA" stroke="#0B0B0B" strokeWidth="2.8" />
                <line x1="18" y1="3" x2="18" y2="12" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
                <line x1="13.5" y1="7.5" x2="22.5" y2="7.5" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
              </g>
            )}

            {/* LEFT EYE RENDERING */}
            {isHurtState ? (
              // HURT: Clenched wincing pain eye >
              <path
                d="M 27 26 L 49 38 L 27 50"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="6.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : isTypingActive && pipBounce.squint ? (
              // BOUNCING ON GROUND: SQUINT EYE (curved impact arc)
              <path
                d="M 23 40 Q 43 23 63 40"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="6.5"
                strokeLinecap="round"
              />
            ) : expression === 'celebrate' ? (
              <path
                d="M 28 42 Q 43 24 58 42"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="6"
                strokeLinecap="round"
              />
            ) : isBlinking ? (
              <line
                x1="24"
                y1={eyeCy}
                x2="62"
                y2={eyeCy}
                stroke="#0B0B0B"
                strokeWidth="6"
                strokeLinecap="round"
              />
            ) : (
              // NORMAL OR BOUNCE IN AIR: WIDE OPEN ROUND EYE
              <g>
                <circle
                  cx={leftEyeCx}
                  cy={eyeCy}
                  r={isTypingActive ? 22 : eyeR}
                  fill="#FFFFFF"
                  stroke="#0B0B0B"
                  strokeWidth="5.5"
                />
                <circle
                  cx={pLeftX}
                  cy={pLeftY}
                  r={isTypingActive ? 10.5 : expression === 'concerned' ? 6 : 9}
                  fill="#0B0B0B"
                  style={{ transition: 'cx 0.08s ease-out, cy 0.08s ease-out' }}
                />
                <circle
                  cx={pLeftX + 2.5}
                  cy={pLeftY - 2.5}
                  r={isTypingActive ? 3.2 : 2.6}
                  fill="#FFFFFF"
                  style={{ transition: 'cx 0.08s ease-out, cy 0.08s ease-out' }}
                />
              </g>
            )}

            {/* RIGHT EYE RENDERING */}
            {isHurtState ? (
              // HURT: Clenched wincing pain eye <
              <path
                d="M 93 26 L 71 38 L 93 50"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="6.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : isTypingActive && pipBounce.squint ? (
              // BOUNCING ON GROUND: SQUINT EYE
              <path
                d="M 57 40 Q 77 23 97 40"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="6.5"
                strokeLinecap="round"
              />
            ) : expression === 'celebrate' ? (
              <path
                d="M 62 42 Q 77 24 92 42"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="6"
                strokeLinecap="round"
              />
            ) : isBlinking ? (
              <line
                x1="58"
                y1={eyeCy}
                x2="96"
                y2={eyeCy}
                stroke="#0B0B0B"
                strokeWidth="6"
                strokeLinecap="round"
              />
            ) : (
              // NORMAL OR BOUNCE IN AIR: WIDE OPEN ROUND EYE
              <g>
                <circle
                  cx={rightEyeCx}
                  cy={eyeCy}
                  r={isTypingActive ? 22 : eyeR}
                  fill="#FFFFFF"
                  stroke="#0B0B0B"
                  strokeWidth="5.5"
                />
                <circle
                  cx={pRightX}
                  cy={pRightY}
                  r={isTypingActive ? 10.5 : expression === 'concerned' ? 6 : 9}
                  fill="#0B0B0B"
                  style={{ transition: 'cx 0.08s ease-out, cy 0.08s ease-out' }}
                />
                <circle
                  cx={pRightX + 2.5}
                  cy={pRightY - 2.5}
                  r={isTypingActive ? 3.2 : 2.6}
                  fill="#FFFFFF"
                  style={{ transition: 'cx 0.08s ease-out, cy 0.08s ease-out' }}
                />
              </g>
            )}

            {/* HURT TEARS: Flying distress tear splashes */}
            {isHurtState && (
              <>
                <path
                  d="M 16 38 Q 8 35 6 42 Q 6 49 14 45 Z"
                  fill="#38BDF8"
                  stroke="#0B0B0B"
                  strokeWidth="2.5"
                  className="animate-bounce"
                />
                <path
                  d="M 104 38 Q 112 35 114 42 Q 114 49 106 45 Z"
                  fill="#38BDF8"
                  stroke="#0B0B0B"
                  strokeWidth="2.5"
                  className="animate-bounce"
                />
              </>
            )}

            {/* MOUTH RENDERING */}
            {isHurtState ? (
              // HURT: Trembling wavy painful groan mouth
              <path
                d="M 40 86 Q 48 76 56 86 Q 64 96 72 86 Q 80 78 84 84"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
            ) : isTypingActive && !pipBounce.squint ? (
              // BOUNCING IN AIR: Joyful wide open open jump mouth
              <path
                d="M 43 78 Q 60 100 77 78 Z"
                fill="#D97706"
                stroke="#0B0B0B"
                strokeWidth="5"
                strokeLinejoin="round"
              />
            ) : isTypingActive && pipBounce.squint ? (
              // BOUNCING ON GROUND: Happy squashed smile
              <path
                d="M 42 82 Q 60 94 78 82"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
            ) : expression === 'celebrate' ? (
              <path
                d="M 44 80 Q 60 102 76 80 Z"
                fill="#D97706"
                stroke="#0B0B0B"
                strokeWidth="5"
                strokeLinejoin="round"
              />
            ) : expression === 'concerned' ? (
              <path
                d="M 46 86 Q 60 76 74 86"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="5"
                strokeLinecap="round"
              />
            ) : expression === 'thinking' ? (
              <circle
                cx="60"
                cy="84"
                r="4.5"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="4"
              />
            ) : (
              <path
                d="M 45 80 Q 56 94 73 82"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
            )}

            {/* Concerned sweat drop */}
            {expression === 'concerned' && (
              <path
                d="M 98 22 C 98 16 104 10 104 10 C 104 10 110 16 110 22 C 110 25 107 28 104 28 C 101 28 98 25 98 22 Z"
                fill="#38BDF8"
                stroke="#0B0B0B"
                strokeWidth="2.5"
                className="animate-bounce"
              />
            )}
          </svg>
        </div>

        {/* Dynamic Ball Bouncing Contact Shadow */}
        <div
          className="w-16 h-2 rounded-full bg-slate-900/25 blur-[1px] -mt-1 transition-all duration-75"
          style={{
            transform: `scaleX(${isTypingActive ? pipBounce.shadowScale : 1})`,
            opacity: isTypingActive ? pipBounce.shadowOpacity : 0.25
          }}
        />
      </div>
    );
  };

  // -------------------------------------------------------------
  // 2. KOKO: THE GOLDEN ARCH (Warm Amber Companion)
  // -------------------------------------------------------------
  const renderKoko = (sizeClass = 'w-18 h-18') => {
    const leftEyeCx = 38;
    const rightEyeCx = 68;
    const eyeCy = 36;
    const eyeR = 17;

    const pLeftX = leftEyeCx + safePupilX * 0.88;
    const pLeftY = eyeCy + safePupilY * 0.88;
    const pRightX = rightEyeCx + safePupilX * 0.88;
    const pRightY = eyeCy + safePupilY * 0.88;

    const totalTilt = baseKokoTilt + pointerLean * 0.65;

    const currentTransform = isTypingActive
      ? `translateY(${kokoBounce.jumpY}px) scaleX(${kokoBounce.scaleX}) scaleY(${kokoBounce.scaleY}) rotate(${totalTilt}deg)`
      : `rotate(${totalTilt}deg) ${stretchTransform}`;

    return (
      <div className="relative flex flex-col items-center">
        <div
          onClick={handleCharacterClick}
          onTouchStart={handleCharacterClick}
          className={`relative ${sizeClass} cursor-pointer select-none transition-transform duration-75 ease-out active:scale-95 ${
            isHurtState
              ? 'animate-hurt-shake'
              : isShaking
              ? 'animate-character-shake'
              : ''
          }`}
          style={{
            transform: currentTransform,
            transformOrigin: 'bottom center',
            animationDelay: isHurtState ? '0.06s' : '0.04s'
          }}
          title={isHurtState ? "Koko - Ouch! Missing field!" : "Koko - Tap to shake!"}
        >
          <svg
            viewBox="0 0 110 110"
            className="w-full h-full overflow-visible drop-shadow-md"
            aria-hidden="true"
          >
            {/* Golden Arch Body */}
            <path
              d="M 12 96 L 12 48 C 12 20 30 10 55 10 C 80 10 98 20 98 48 L 98 96 C 98 100 94 102 90 102 L 20 102 C 16 102 12 100 12 96 Z"
              fill="#F59E0B"
              stroke="#0B0B0B"
              strokeWidth="6.5"
              strokeLinejoin="round"
            />

            {/* HURT: Cartoon knot / swelling bump on head */}
            {isHurtState && (
              <g>
                <path d="M 46 10 Q 55 -3 64 10" fill="#FDE68A" stroke="#0B0B0B" strokeWidth="4" />
                <text x="66" y="6" fontSize="13" fill="#D97706" fontWeight="bold">✦</text>
              </g>
            )}

            {/* LEFT EYE */}
            {isHurtState ? (
              // Clenched wincing eye >
              <path
                d="M 22 24 L 42 36 L 22 48"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : isTypingActive && kokoBounce.squint ? (
              // Squint eye on ground impact
              <path
                d="M 22 38 Q 38 23 54 38"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
            ) : expression === 'celebrate' ? (
              <path
                d="M 26 38 Q 38 24 50 38"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="5"
                strokeLinecap="round"
              />
            ) : isBlinking ? (
              <line x1="22" y1={eyeCy} x2="52" y2={eyeCy} stroke="#0B0B0B" strokeWidth="5" strokeLinecap="round" />
            ) : (
              // WIDE OPEN ROUND EYE IN AIR / NORMAL
              <g>
                <circle cx={leftEyeCx} cy={eyeCy} r={isTypingActive ? 18 : eyeR} fill="#FFFFFF" stroke="#0B0B0B" strokeWidth="5" />
                <circle cx={pLeftX} cy={pLeftY} r={isTypingActive ? 8.5 : expression === 'concerned' ? 5 : 7.5} fill="#0B0B0B" style={{ transition: 'cx 0.08s ease-out, cy 0.08s ease-out' }} />
                <circle cx={pLeftX + 2} cy={pLeftY - 2} r={isTypingActive ? 2.6 : 2} fill="#FFFFFF" style={{ transition: 'cx 0.08s ease-out, cy 0.08s ease-out' }} />
              </g>
            )}

            {/* RIGHT EYE */}
            {isHurtState ? (
              // Clenched wincing eye <
              <path
                d="M 84 24 L 64 36 L 84 48"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : isTypingActive && kokoBounce.squint ? (
              // Squint eye on ground impact
              <path
                d="M 52 38 Q 68 23 84 38"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
            ) : expression === 'celebrate' ? (
              <path
                d="M 56 38 Q 68 24 80 38"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="5"
                strokeLinecap="round"
              />
            ) : isBlinking ? (
              <line x1="54" y1={eyeCy} x2="84" y2={eyeCy} stroke="#0B0B0B" strokeWidth="5" strokeLinecap="round" />
            ) : (
              // WIDE OPEN ROUND EYE IN AIR / NORMAL
              <g>
                <circle cx={rightEyeCx} cy={eyeCy} r={isTypingActive ? 18 : eyeR} fill="#FFFFFF" stroke="#0B0B0B" strokeWidth="5" />
                <circle cx={pRightX} cy={pRightY} r={isTypingActive ? 8.5 : expression === 'concerned' ? 5 : 7.5} fill="#0B0B0B" style={{ transition: 'cx 0.08s ease-out, cy 0.08s ease-out' }} />
                <circle cx={pRightX + 2} cy={pRightY - 2} r={isTypingActive ? 2.6 : 2} fill="#FFFFFF" style={{ transition: 'cx 0.08s ease-out, cy 0.08s ease-out' }} />
              </g>
            )}

            {/* HURT TEARS */}
            {isHurtState && (
              <path
                d="M 12 50 Q 6 48 4 54 Q 4 60 10 56 Z"
                fill="#38BDF8"
                stroke="#0B0B0B"
                strokeWidth="2"
                className="animate-bounce"
              />
            )}

            {/* MOUTH */}
            {isHurtState ? (
              // Wavy trembling hurt frown
              <path
                d="M 42 76 Q 55 64 68 76"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="5"
                strokeLinecap="round"
              />
            ) : isTypingActive && !kokoBounce.squint ? (
              // Open joyful bounce mouth in air
              <path
                d="M 40 66 Q 53 84 66 66 Z"
                fill="#D97706"
                stroke="#0B0B0B"
                strokeWidth="4"
                strokeLinejoin="round"
              />
            ) : isTypingActive && kokoBounce.squint ? (
              // Happy smile on impact
              <path
                d="M 44 68 Q 55 78 66 68"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            ) : expression === 'celebrate' ? (
              <path
                d="M 40 66 Q 53 82 66 66 Z"
                fill="#D97706"
                stroke="#0B0B0B"
                strokeWidth="4"
                strokeLinejoin="round"
              />
            ) : expression === 'concerned' ? (
              <path
                d="M 44 72 Q 53 64 64 72"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="4"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M 44 68 Q 55 78 66 68"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </div>

        <div
          className="w-13 h-2 rounded-full bg-slate-900/25 blur-[1px] -mt-1 transition-all duration-75"
          style={{
            transform: `scaleX(${isTypingActive ? kokoBounce.shadowScale : 1})`,
            opacity: isTypingActive ? kokoBounce.shadowOpacity : 0.25
          }}
        />
      </div>
    );
  };

  // -------------------------------------------------------------
  // 3. MILO: THE CYAN CIRCLE (Bouncy round ball)
  // -------------------------------------------------------------
  const renderMilo = (sizeClass = 'w-16 h-16') => {
    const leftEyeCx = 36;
    const rightEyeCx = 64;
    const eyeCy = 38;
    const eyeR = 14;

    const pLeftX = leftEyeCx + safePupilX * 0.78;
    const pLeftY = eyeCy + safePupilY * 0.78;
    const pRightX = rightEyeCx + safePupilX * 0.78;
    const pRightY = eyeCy + safePupilY * 0.78;

    const totalTilt = baseMiloTilt + pointerLean * 0.6;

    const currentTransform = isTypingActive
      ? `translateY(${miloBounce.jumpY}px) scaleX(${miloBounce.scaleX}) scaleY(${miloBounce.scaleY}) rotate(${totalTilt}deg)`
      : `rotate(${totalTilt}deg) ${stretchTransform}`;

    return (
      <div className="relative flex flex-col items-center">
        <div
          onClick={handleCharacterClick}
          onTouchStart={handleCharacterClick}
          className={`relative ${sizeClass} cursor-pointer select-none transition-transform duration-75 ease-out active:scale-95 ${
            isHurtState
              ? 'animate-hurt-shake'
              : isShaking
              ? 'animate-character-shake'
              : ''
          }`}
          style={{
            transform: currentTransform,
            transformOrigin: 'bottom center',
            animationDelay: isHurtState ? '0.12s' : '0.08s'
          }}
          title={isHurtState ? "Milo - Ouch! Missing field!" : "Milo - Tap to shake!"}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full overflow-visible drop-shadow-md"
            aria-hidden="true"
          >
            {/* Cyan Round Body */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="#38BDF8"
              stroke="#0B0B0B"
              strokeWidth="6"
            />

            {/* HURT: Orbiting dizzy stars */}
            {isHurtState && (
              <g>
                <text x="44" y="6" fontSize="13" fill="#F59E0B">★</text>
                <text x="20" y="14" fontSize="10" fill="#F59E0B">✦</text>
                <text x="70" y="14" fontSize="10" fill="#F59E0B">✦</text>
              </g>
            )}

            {/* LEFT EYE */}
            {isHurtState ? (
              <path
                d="M 22 28 L 36 38 L 22 48"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : isTypingActive && miloBounce.squint ? (
              // Squint eye on ground impact
              <path
                d="M 22 38 Q 36 24 50 38"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="5"
                strokeLinecap="round"
              />
            ) : expression === 'celebrate' ? (
              <path d="M 26 38 Q 36 26 46 38" fill="none" stroke="#0B0B0B" strokeWidth="4.5" strokeLinecap="round" />
            ) : isBlinking ? (
              <line x1="22" y1={eyeCy} x2="48" y2={eyeCy} stroke="#0B0B0B" strokeWidth="4.5" strokeLinecap="round" />
            ) : (
              // WIDE OPEN ROUND EYE IN AIR / NORMAL
              <g>
                <circle cx={leftEyeCx} cy={eyeCy} r={isTypingActive ? 15 : eyeR} fill="#FFFFFF" stroke="#0B0B0B" strokeWidth="4.5" />
                <circle cx={pLeftX} cy={pLeftY} r={isTypingActive ? 7 : expression === 'concerned' ? 4 : 6} fill="#0B0B0B" style={{ transition: 'cx 0.08s ease-out, cy 0.08s ease-out' }} />
                <circle cx={pLeftX + 1.5} cy={pLeftY - 1.5} r={isTypingActive ? 2.2 : 1.8} fill="#FFFFFF" style={{ transition: 'cx 0.08s ease-out, cy 0.08s ease-out' }} />
              </g>
            )}

            {/* RIGHT EYE */}
            {isHurtState ? (
              <path
                d="M 78 28 L 64 38 L 78 48"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : isTypingActive && miloBounce.squint ? (
              // Squint eye on ground impact
              <path
                d="M 50 38 Q 64 24 78 38"
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="5"
                strokeLinecap="round"
              />
            ) : expression === 'celebrate' ? (
              <path d="M 54 38 Q 64 26 74 38" fill="none" stroke="#0B0B0B" strokeWidth="4.5" strokeLinecap="round" />
            ) : isBlinking ? (
              <line x1="52" y1={eyeCy} x2="78" y2={eyeCy} stroke="#0B0B0B" strokeWidth="4.5" strokeLinecap="round" />
            ) : (
              // WIDE OPEN ROUND EYE IN AIR / NORMAL
              <g>
                <circle cx={rightEyeCx} cy={eyeCy} r={isTypingActive ? 15 : eyeR} fill="#FFFFFF" stroke="#0B0B0B" strokeWidth="4.5" />
                <circle cx={pRightX} cy={pRightY} r={isTypingActive ? 7 : expression === 'concerned' ? 4 : 6} fill="#0B0B0B" style={{ transition: 'cx 0.08s ease-out, cy 0.08s ease-out' }} />
                <circle cx={pRightX + 1.5} cy={pRightY - 1.5} r={isTypingActive ? 2.2 : 1.8} fill="#FFFFFF" style={{ transition: 'cx 0.08s ease-out, cy 0.08s ease-out' }} />
              </g>
            )}

            {/* MOUTH */}
            {isHurtState ? (
              // Open trembling wailing mouth
              <path
                d="M 40 64 Q 50 54 60 64 Q 50 78 40 64 Z"
                fill="#EF4444"
                stroke="#0B0B0B"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
            ) : isTypingActive && !miloBounce.squint ? (
              // Wide open jump smile
              <path
                d="M 40 58 Q 50 72 60 58 Z"
                fill="#D97706"
                stroke="#0B0B0B"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
            ) : isTypingActive && miloBounce.squint ? (
              // Squished smile on ground
              <path d="M 44 60 Q 50 68 58 60" fill="none" stroke="#0B0B0B" strokeWidth="4" strokeLinecap="round" />
            ) : expression === 'celebrate' ? (
              <path d="M 40 60 Q 50 72 60 60" fill="none" stroke="#0B0B0B" strokeWidth="4" strokeLinecap="round" />
            ) : expression === 'concerned' ? (
              <circle cx="50" cy="64" r="3.5" fill="none" stroke="#0B0B0B" strokeWidth="3.5" />
            ) : (
              <path d="M 44 58 Q 50 66 58 60" fill="none" stroke="#0B0B0B" strokeWidth="4" strokeLinecap="round" />
            )}
          </svg>
        </div>

        <div
          className="w-12 h-2 rounded-full bg-slate-900/25 blur-[1px] -mt-1 transition-all duration-75"
          style={{
            transform: `scaleX(${isTypingActive ? miloBounce.shadowScale : 1})`,
            opacity: isTypingActive ? miloBounce.shadowOpacity : 0.25
          }}
        />
      </div>
    );
  };

  // -------------------------------------------------------------
  // LAYOUT 1: SIDEBAR (DESKTOP)
  // -------------------------------------------------------------
  if (variant === 'sidebar') {
    return (
      <div
        ref={containerRef}
        className={`w-full flex flex-col items-center justify-start p-5 rounded-3xl border shadow-xl select-none transition-all duration-300 ${
          isHurtState
            ? 'bg-rose-50/95 border-rose-400 ring-2 ring-rose-400/30 shadow-rose-500/10'
            : isFieldActive
            ? 'bg-slate-50/95 border-amber-400 ring-2 ring-amber-400/20 shadow-amber-500/10'
            : 'bg-slate-50/95 border-slate-200'
        }`}
      >
        {/* Header Badge */}
        <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-800">
              Interactive Guide
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
              isHurtState
                ? 'bg-rose-500 text-white animate-pulse'
                : isTypingActive
                ? 'bg-indigo-500 text-white animate-bounce'
                : isFieldActive
                ? 'bg-amber-400 text-amber-950 animate-pulse'
                : 'bg-emerald-100 text-emerald-800'
            }`}>
              {isHurtState ? 'Ouch!' : isTypingActive ? 'Bouncing!' : isFieldActive ? 'Active' : 'Live'}
            </span>
          </div>
          <span className={`inline-block w-2.5 h-2.5 rounded-full ${isHurtState ? 'bg-rose-500 animate-ping' : 'bg-emerald-500 animate-ping'}`} />
        </div>

        {/* Characters Clustered Stage */}
        <div className={`relative w-full flex items-end justify-center gap-3 py-3 px-2 transition-all duration-300 ${
          isFieldActive || isTypingActive ? 'min-h-[195px]' : 'min-h-[160px]'
        }`}>
          {/* Milo (Left) */}
          <div className="transform hover:scale-105 transition-transform">
            {renderMilo('w-16 h-16')}
          </div>

          {/* Pip (Center Hero) */}
          <div className="transform -translate-y-1 z-10 hover:scale-105 transition-transform">
            {renderPip('w-26 h-26')}
          </div>

          {/* Koko (Right) */}
          <div className="transform hover:scale-105 transition-transform">
            {renderKoko('w-18 h-18')}
          </div>
        </div>

        {/* Dynamic State Status Pill */}
        <div className={`mt-2 px-4 py-2 rounded-2xl border text-xs font-bold text-center shadow-xs transition-all flex items-center justify-center gap-2 max-w-full ${
          isHurtState
            ? 'bg-rose-100 border-rose-300 text-rose-900 scale-102 ring-1 ring-rose-300'
            : isTypingActive
            ? 'bg-indigo-50 border-indigo-200 text-indigo-900 scale-102'
            : isFieldActive
            ? 'bg-amber-50 border-amber-300 text-amber-900 scale-102'
            : 'bg-white border-slate-200 text-slate-800'
        }`}>
          {isHurtState ? (
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 animate-bounce" />
          ) : isTypingActive ? (
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0 animate-spin" />
          ) : (
            <span className={`w-2 h-2 rounded-full shrink-0 ${isFieldActive ? 'bg-amber-500 animate-bounce' : 'bg-slate-400'}`} />
          )}
          <span className="truncate">{message}</span>
        </div>

        <p className="text-[11px] text-slate-500 text-center mt-3 leading-relaxed">
          {isHurtState
            ? 'Characters shake and hurt when required fields are left blank!'
            : isTypingActive
            ? 'Ball bouncing physics active! Eyes squint on landing and open on jumps.'
            : 'Type in any field to bounce, or touch fields to perk up.'}
        </p>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LAYOUT 2: HORIZONTAL STAGE (MOBILE & TABLET / OVERLAY)
  // -------------------------------------------------------------
  return (
    <div
      ref={containerRef}
      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl border shadow-md select-none transition-all duration-300 ${
        isHurtState
          ? 'bg-rose-50/95 border-rose-400 ring-2 ring-rose-400/20 shadow-rose-500/10'
          : isFieldActive
          ? 'bg-amber-50/95 border-amber-300 shadow-amber-500/10'
          : 'bg-white/95 border-slate-200'
      }`}
    >
      <div className={`flex items-end gap-2 transition-all duration-300 ${
        isFieldActive || isTypingActive ? 'scale-105 -translate-y-0.5' : ''
      }`}>
        <div className="hover:scale-105 transition-transform">{renderMilo('w-10 h-10 sm:w-12 sm:h-12')}</div>
        <div className="hover:scale-105 transition-transform">{renderPip('w-14 h-14 sm:w-16 sm:h-16')}</div>
        <div className="hover:scale-105 transition-transform">{renderKoko('w-12 h-12 sm:w-14 sm:h-14')}</div>
      </div>

      {/* Reactive State Badge */}
      <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold shadow-xs shrink-0 flex items-center gap-2 transition-all ${
        isHurtState
          ? 'bg-rose-100 border-rose-300 text-rose-900'
          : isTypingActive
          ? 'bg-indigo-100 border-indigo-300 text-indigo-900'
          : isFieldActive
          ? 'bg-white border-amber-300 text-amber-900'
          : 'bg-slate-50 border-slate-200 text-slate-800'
      }`}>
        {isHurtState ? (
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 animate-bounce" />
        ) : (
          <span className={`w-2 h-2 rounded-full shrink-0 ${isTypingActive ? 'bg-indigo-500 animate-ping' : isFieldActive ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`} />
        )}
        <span className="truncate max-w-[130px] sm:max-w-none">{message}</span>
      </div>
    </div>
  );
};
