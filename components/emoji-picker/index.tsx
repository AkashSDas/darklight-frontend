import data from "@emoji-mart/data";

import Picker from "@emoji-mart/react";

interface Props {
  onSelect: (emoji: any) => void;
  handleClose: () => void;
}

function EmojiPicker({ onSelect, handleClose }: Props) {
  return (
    <Picker
      data={data}
      onEmojiSelect={onSelect}
      onOutSideClick={handleClose}
      emojiButtonSize={44}
      emojiButtonRadius={"12px"}
      icons="outline"
    />
  );
}

export default EmojiPicker;
