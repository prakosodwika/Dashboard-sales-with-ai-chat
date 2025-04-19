import { Button } from "@/components/ui/button";
import { getAnswerAI } from "../../lib/fetcher";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";
import ReactMarkdown from "react-markdown";

const AISheet: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [asking, setAsking] = useState<boolean>(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setAsking(true);
    try {
      const response = await getAnswerAI(question);
      typingEffect(response, 20);
    } catch (error) {
      toast.error("Failed to get an answer from AI. Please try again later.", {
        style: {
          backgroundColor: 'red',
          color: 'white',
        },
      });
    } finally {
      setAsking(false);
    }
  };

  const typingEffect = (text: string, speed: number) => {
    let i = 0;
    setAnswer("");
    const interval = setInterval(() => {
      setAnswer((prev) => prev + text[i]);
      i++;
      if (i === text.length) {
        clearInterval(interval);
      }
    }, speed);
  };

  const handleSheetClose = () => {
    if (!answer) setQuestion("");
  };

  return (
    <Sheet onOpenChange={(isOpen) => !isOpen && handleSheetClose()}>
      <SheetTrigger asChild>
        <Button variant="outline">Open AI Chat</Button>
      </SheetTrigger>
      <SheetContent style={{ maxWidth: "50vw" }}>
        <SheetHeader>
          <SheetTitle>Ask AI About Sales Representatives</SheetTitle>
          <SheetDescription>
            You can ask anything related to sales performance, reps data, or other business questions.
          </SheetDescription>
        </SheetHeader>

        <div className="m-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Question</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
            placeholder="e.g. Who is the top performer this month?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button onClick={handleAsk} disabled={asking}>
              {asking ? "Asking..." : answer ? "Ask Again" : "Ask AI"}
            </Button>
          </div>

          {answer && (
            <div className="mt-4 bg-gray-100 p-4 rounded-md max-h-[68vh] overflow-y-auto">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="whitespace-pre-wrap text-lg text-gray-700 mb-2">{children}</p>,
                  h1: ({ children }) => <h1 className="text-2xl font-bold text-gray-900 mb-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-semibold text-gray-800 mb-3">{children}</h2>,
                  ul: ({ children }) => <ul className="list-disc pl-5">{children}</ul>,
                  li: ({ children }) => <li className="text-gray-700">{children}</li>,
                  a: ({ children, href }) => <a href={href} className="text-blue-500 hover:underline">{children}</a>,
                }}
              >
                {answer}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AISheet;
