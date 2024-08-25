import { useEffect, useRef, useState } from "react";
import { BiMicrophone, BiMicrophoneOff, BiPaperclip, BiPaperPlane } from "react-icons/bi";
// import "regenerator-runtime/runtime";

function ChatHistoryFooter({ sendMessage }: { sendMessage: () => void }) {
  const [isListening, setIsListening] = useState(false);
  // const recognitionRef = useRef<SpeechRecognition>(null);
  const micRef = useRef<HTMLElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const micOffRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    const micElement = micRef.current;
    const messageInput = messageInputRef.current;
    const micOffElement = micOffRef.current;

    if (micElement && SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      // recognitionRef.current = recognitionInstance;

      recognitionInstance.continuous = true; // keep listening
      recognitionInstance.interimResults = true; // show interim results

      recognitionInstance.addEventListener("speechstart", () => {
        setIsListening(true);
      });

      recognitionInstance.onerror = () => {
        setIsListening(false);
      };

      recognitionInstance.addEventListener("speechend", () => {
        recognitionInstance.stop();
        setIsListening(false);
        micElement.classList.remove("text-primary");
        micElement.classList.add("text-heading");
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognitionInstance.onresult = (event: any) => {
        let interimTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          interimTranscript += result[0].transcript;
        }
        if (messageInput) {
          messageInput.value = interimTranscript;
          $(messageInput).attr("style", `1px !important`);
          const height = messageInput.scrollHeight;
          $(messageInput).attr("style", `height: ${height}px !important`);
        }
      };

      const handleMicClick = () => {
        if (!isListening) {
          setIsListening(true);
          recognitionInstance.start();
          micElement.classList.add("!hidden");
          micOffElement?.classList.remove("!hidden");
          micOffElement?.classList.add("text-primary");
          micOffElement?.classList.remove("text-heading");
          micOffElement?.classList.add("animate-pulse");
        } else {
          recognitionInstance.abort();
          setIsListening(false);
          micElement.classList.remove("!hidden");
          micOffElement?.classList.add("!hidden");
          micOffElement?.classList.remove("text-primary");
          micOffElement?.classList.add("text-heading");
          micOffElement?.classList.remove("animate-pulse");
        }
      };

      micElement.addEventListener("click", handleMicClick);

      const handleMicOffClick = () => {
        recognitionInstance.abort();
        setIsListening(false);
        micElement.classList.remove("!hidden");
        micOffElement?.classList.add("!hidden");
        micOffElement?.classList.remove("text-primary");
        micOffElement?.classList.add("text-heading");
        micOffElement?.classList.remove("animate-pulse");
      };

      if (micOffElement) {
        micOffElement.addEventListener("click", handleMicOffClick);
      }

      if (messageInput) {
        messageInput.addEventListener("input", () => {
          $(messageInput).attr("style", `1px !important`);
          const height = messageInput.scrollHeight;
          $(messageInput).attr("style", `height: ${height}px !important`);
        });
      }

      // Cleanup function to remove event listeners
      return () => {
        micElement.removeEventListener("click", handleMicClick);
        recognitionInstance.removeEventListener("speechstart", () =>
          setIsListening(true)
        );
        recognitionInstance.removeEventListener("speechend", () => {
          recognitionInstance.abort();
          setIsListening(false);
          micElement.classList.remove("!hidden");
          micOffElement?.classList.add("!hidden");
          micOffElement?.classList.remove("text-primary");
          micOffElement?.classList.add("text-heading");
          micOffElement?.classList.remove("animate-pulse");
        });
      };
    }
  }, [isListening]);

  return (
    <div className="chat-history-footer shadow-xs">
      <form className="form-send-message d-flex justify-content-between align-items-center ">
        <div className="textarea-container w-full relative">
          <textarea
            className="form-control message-input border-0 ms-4 shadow-none w-full break-words resize-none overflow-hidden absolute -bottom-[26px] -left-5 !mt-[50px] !pl-3"
            placeholder="Type your message here..."
            ref={messageInputRef}
            autoComplete="off"
            autoFocus={true}
          />
        </div>
        <div className="message-actions d-flex align-items-center">
          <span ref={micRef}>
            <BiMicrophone
              className="ic-md speech-to-text cursor-pointer text-heading"
              title="Voice Message"
              id="speech-to-text"
            />
          </span>
          {/* <i
            className="speech-to-text bx bx-microphone ic-md btn btn-icon cursor-pointer text-heading"
            title="Voice Message"
            id="speech-to-text"
            ref={micRef}
          ></i> */}
          <span ref={micOffRef} className="!hidden">
            <BiMicrophoneOff
              className="ic-md cursor-pointer text-heading"
              title="Voice Message"
              id="speech-to-text"
            />
          </span>
          {/* <i
            className="bx bx-microphone-off ic-md btn btn-icon cursor-pointer text-heading !hidden"
            title="Voice Message"
            id="speech-to-text"
            ref={micOffRef}
          ></i> */}
          <label htmlFor="attach-doc" className="form-label mb-0">
            <BiPaperclip className="ic-md cursor-pointer text-heading mx-3" />
            {/* <i className="bx bx-paperclip ic-md cursor-pointer btn btn-icon mx-1 text-heading"></i> */}
            <input type="file" id="attach-doc" hidden />
          </label>
          <button
            className="btn btn-primary d-flex send-msg-btn"
            onClick={sendMessage}
          >
            <span className="align-middle d-md-inline-block d-none">Send</span>
            <BiPaperPlane className="ic-sm ms-md-2 ms-0" />
            {/* <i className="bx bx-paper-plane ic-sm ms-md-2 ms-0"></i> */}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatHistoryFooter;
