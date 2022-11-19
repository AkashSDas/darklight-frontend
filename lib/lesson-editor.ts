export var lessonContentOptions = [
  {
    id: "paragraph",
    label: "Paragraph",
    src: "/content-types/paragraph.png",
  },
  // {id: "paragraph", label: "Heading 1", src: "/content-types/h1.png" },
  // {id: "paragraph", label: "Heading 2", src: "/content-types/h2.png" },
  // {id: "paragraph", label: "Heading 3", src: "/content-types/h3.png" },
  // {id: "paragraph", label: "Blutted list", src: "/content-types/bulleted-list.png" },
  // {id: "paragraph", label: "Numbered list", src: "/content-types/numbered-list.png" },
  // {id: "paragraph", label: "Quote", src: "/content-types/quote.png" },
  { id: "divider", label: "Divider", src: "/content-types/divider.png" },
  // {id: "paragraph", label: "Callout", src: "/content-types/callout.png" },
  // {id: "paragraph", label: "Code", src: "/content-types/code.png" },
  // {id: "paragraph", label: "Image", src: "/content-types/image.png" },
];

// ============================
// Content of the lesson editor
// ============================

export interface ParagraphContent {
  type: "paragraph";
  data: { key: string; value: string }[];
}

export interface DividerContent {
  type: "divider";
  data: [];
}

export function createContent(id: string) {
  switch (id) {
    case "paragraph":
      return {
        type: "paragraph",
        data: [{ key: "text", value: "Hello world" }],
      } as ParagraphContent;
    case "divider":
      return {
        type: "divider",
      } as DividerContent;
    default:
      return null;
  }
}
