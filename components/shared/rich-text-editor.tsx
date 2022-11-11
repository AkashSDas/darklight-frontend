import { useRef, useState } from "react";

// This is not working, I'm current working on making it work in the `underlineCommand`
function Paragraph() {
  var ref = useRef("");
  var [value, setValue] = useState();

  function handleChange(evt) {
    ref.current = evt.target.value;
  }

  function handleBlur(e) {
    // console.log(ref.current);
    setValue(e.target.selectionStart);
  }

  function wrapElement(element) {
    const userSelection = window.getSelection();
    const selectedTextRange = userSelection.getRangeAt(0);
    selectedTextRange.surroundContents(element);
  }

  function codeCommand() {
    const element = document.createElement("code");
    wrapElement(element);
  }

  function underlineCommand() {
    const userSelection = window.getSelection();
    const selectedTextRange = userSelection.getRangeAt(0);

    var parentStyle = userSelection.focusNode.parentElement.style;
    const ele = document.createElement("span");
    ele.textContent = userSelection.toString();
    ele.style.fontWeight = parentStyle.fontWeight;
    ele.style.fontStyle = parentStyle.fontStyle;

    console.log(parentStyle.textDecoration);
    if (parentStyle["textDecoration"] == "underline") {
      ele.style.textDecoration = "none";
    } else {
      ele.style.textDecoration = "underline";
    }

    selectedTextRange.deleteContents();
    selectedTextRange.insertNode(ele);

    // ele.appendChild();

    // if (
    //   parentElement.tagName == "DIV" &&
    //   userSelection.anchorNode.nodeName == "#text"
    // ) {
    //   console.log(selectedTextRange, parentElement);
    //   selectedTextRange.surroundContents(element);
    //   // selectedTextRange.surroundContents(element);
    //   // element.appendChild(selectedTextRange.extractContents());
    //   // selectedTextRange.insertNode(element);
    // } else if (
    //   parentElement.tagName == "SPAN" &&
    //   userSelection.anchorNode.nodeName == "#text"
    // ) {
    //   if (parentElement.style.textDecoration == "underline") {
    //     parentElement.style.textDecoration = "none";
    //   } else {
    //     parentElement.style.textDecoration = "underline";
    //   }
    // } else if (
    //   parentElement.tagName == "DIV" &&
    //   userSelection.anchorNode.nodeName == "DIV"
    // ) {
    //   console.log(parentElement);
    // }
  }

  function boldCommand() {
    const element = document.createElement("span");
    element.style.fontWeight = "700";
    wrapElement(element);
  }

  function italicCommand() {
    const element = document.createElement("span");
    element.style.fontStyle = "italic";
    wrapElement(element);
  }

  function strikeCommand() {
    const element = document.createElement("span");
    element.classList.add("line-through");
    wrapElement(element);
  }

  function linkCommand() {
    const element = document.createElement("a");
    element.classList.add("text-blue-500");
    element.href = "https://google.com";
    wrapElement(element);
  }

  function imageCommand() {
    const element = document.createElement("img");
    element.src = "https://picsum.photos/200/300";
    element.alt = "image";
    element.classList.add("w-full");
    wrapElement(element);
  }

  function listCommand() {
    const element = document.createElement("li");
    element.classList.add("list-disc");
    wrapElement(element);
  }

  function numberListCommand() {
    const element = document.createElement("li");
    element.classList.add("list-decimal");

    wrapElement(element);
  }

  function blockquoteCommand() {
    const element = document.createElement("blockquote");
    element.classList.add("border-l-4", "border-gray-300", "pl-4");
    wrapElement(element);
  }

  function headingCommand() {
    const element = document.createElement("h2");
    element.classList.add("font-urbanist", "font-bold", "text-[30px]");
    wrapElement(element);
  }

  function subheadingCommand() {
    const element = document.createElement("h3");
    element.classList.add("font-urbanist", "font-bold", "text-[24px]");
    wrapElement(element);
  }

  function subsubheadingCommand() {
    const element = document.createElement("h4");
    element.classList.add("font-urbanist", "font-bold", "text-[20px]");
    wrapElement(element);
  }

  function paragraphCommand() {
    const element = document.createElement("p");
    element.classList.add("font-urbanist", "text-[16px]");
    wrapElement(element);
  }

  return (
    <div
      className="editable-content"
      contentEditable
      onInput={handleChange}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key == "Enter") e.preventDefault();
        if (e.key == "k" && e.metaKey) codeCommand();
        if (e.key == "u" && e.metaKey) underlineCommand();
        if (e.key == "b" && e.metaKey) boldCommand();
        if (e.key == "i" && e.metaKey) italicCommand();
      }}
    >
      {value}
    </div>
  );
}
