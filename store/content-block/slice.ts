import { ContentBlockType } from "@lib/content-block";
import { createSlice } from "@reduxjs/toolkit";

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  data?: { key: string; value: string }[];
}

export interface LessonContent {
  blocks: ContentBlock[];
}

var initialState: LessonContent = { blocks: [] };

var contentBlockSlice = createSlice({
  name: "content-block",
  initialState,
  reducers: {},
});

export default contentBlockSlice.reducer;
