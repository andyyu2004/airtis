import { useState } from "react";
import { Dialog } from "@headlessui/react";

export function ResultDialog() {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      className="fixed inset-0 z-10 overflow-y-auto"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Dialog.Panel className="flex items-center justify-center">
        <Dialog.Title>Result</Dialog.Title>
        <Dialog.Description>This will</Dialog.Description>

        <p>Congratulations, You win</p>

        <div className="mt-8 flex items-center justify-end space-x-2">
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
