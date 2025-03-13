// modalRegistry.ts
import React from "react";
import { AuthCheckModal } from "../modal-auth/AuthCheckModal";
import { ProfileModal } from "../modal-profile/ProfileModal";
import { WriteReviewModal } from "../modal-review/WriteReviewModal";

export interface ModalDefinition {
  authCheck: boolean;
  component: React.ComponentType;
}

export const modalRegistry: Record<string, ModalDefinition> = {
  writeReviewModal: {
    authCheck: true,
    component: WriteReviewModal,
  },
  profileModal: {
    authCheck: true,
    component: ProfileModal,
  },
  authCheckModal: {
    authCheck: false,
    component: AuthCheckModal,
  },
};