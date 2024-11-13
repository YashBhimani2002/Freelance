import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface InactivityTimerProps {
  onTimeout: () => void;
}

const InactivityTimer: React.FC<InactivityTimerProps> = ({ onTimeout }) => {
  const router = useRouter();

  const expireSession = () => {
    localStorage.removeItem("token"); // Replace 'token' with your actual token key
    onTimeout(); // Trigger any additional logic on timeout
    router.push("/login"); // Redirect to login or home page
  };

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        expireSession(); // Expire session and token when timer runs out
      }, 60 * 60 * 1000); // 1 hour timeout
      // timeoutId = setTimeout(expireSession, 30000); // 30 seconds for testing
    };

    resetTimer(); // Initial timer start

    // Add event listeners to reset the timer on user activity
    const events = ["mousemove", "keypress", "click", "scroll"];
    const eventListener = () => resetTimer();
    events.forEach((event) => {
      window.addEventListener(event, eventListener);
    });

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) => {
        window.removeEventListener(event, eventListener);
      });
    };
  }, [onTimeout, router]);

  return null;
};

export default InactivityTimer;
