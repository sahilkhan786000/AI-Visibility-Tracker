import { useState } from "react";
import AnswerViewer from "./AnswerViewer";

export default function PromptTable() {
  const [showAnswer, setShowAnswer] = useState(false);

  const mockAnswer = `
For startups, HubSpot is often recommended due to its ease of use and strong integrations.
Salesforce is powerful but may be complex for smaller teams.
  `;

  return (
    <>
      <div className="p-6 rounded-xl bg-white/10">
        <h3 className="font-semibold mb-4">Prompt Breakdown</h3>

        <table className="w-full text-sm">
          <tbody>
            <tr
              className="cursor-pointer hover:bg-white/5"
              onClick={() => setShowAnswer(true)}
            >
              <td>Best CRM for startups?</td>
              <td>✅</td>
              <td>1st</td>
            </tr>
          </tbody>
        </table>
      </div>

      {showAnswer && (
        <AnswerViewer
          answer={mockAnswer}
          onClose={() => setShowAnswer(false)}
        />
      )}
    </>
  );
}
