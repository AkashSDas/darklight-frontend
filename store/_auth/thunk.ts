import toast from "react-hot-toast";
import { SignupPayload, signupService } from "services/_auth";

import { createAsyncThunk } from "@reduxjs/toolkit";

export var signupThunk = createAsyncThunk(
  "_auth/signup",
  async function signup(payload: SignupPayload) {
    var res = await signupService(payload);
    if (res.success) toast.success(res.msg);
    else toast.error(res.msg);
  }
);
