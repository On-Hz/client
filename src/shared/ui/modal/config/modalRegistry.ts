import React from "react";
import { AuthInfoModal } from "../modal-auth/AuthInfoModal";
import { ProfileModal } from "../modal-profile/ProfileModal";
import { WriteReview } from "@/features/writeReview/ui/WriteReview";
import { AlertModal } from "../modal-common-alert/AlertModal";

export interface ModalDefinition<T = any> {
  authCheck: boolean;
  component: React.ComponentType<T>;
}

export const modalRegistry: Record<string, ModalDefinition<any>> = {
  alertModal: {
    authCheck: false,
    component: AlertModal,
  },
  writeReviewModal: {
    authCheck: true,
    component: WriteReview,
  },
  profileModal: {
    authCheck: true,
    component: ProfileModal,
  },
  authInfoModal: {
    authCheck: false,
    component: AuthInfoModal,
  },
};
