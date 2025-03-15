import React from "react";
import { AlertModal } from "../modal-common-alert/AlertModal";
import { AuthInfoModal } from "../modal-auth/AuthInfoModal";
import { ProfileModal } from "../modal-profile/ProfileModal";
import { WriteReview, ModifyReview } from "@/features/manageReview";

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
  modifyReviewModal: {
    authCheck: true,
    component: ModifyReview,
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
