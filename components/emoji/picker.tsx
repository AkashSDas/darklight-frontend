import "emoji-mart/css/emoji-mart.css";

import { init, Picker } from "emoji-mart";

import data from "@emoji-mart/data";

init({ data });

export default function EmojiPicker() {
  async function handleSelect(emoji: any) {
    console.log(emoji.native);
  }

  return <Picker data={data} />;
}
