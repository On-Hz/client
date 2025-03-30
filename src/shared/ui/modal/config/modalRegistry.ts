import React from "react";
import { AlertModal } from "../modal-common-alert/AlertModal";
import { AuthInfoModal } from "../modal-auth/AuthInfoModal";
import { ProfileModal } from "../modal-profile/ProfileModal";
import { CreateReview, UpdateReview } from "@/features/review";
export interface ModalDefinition<T = any> {
  authCheck: boolean;
  component: React.ComponentType<T>;
}

export const modalRegistry: Record<string, ModalDefinition<any>> = {
  alertModal: {
    authCheck: false,
    component: AlertModal,
  },
  createReviewModal: {
    authCheck: true,
    component: CreateReview,
  },
  updateReviewModal: {
    authCheck: true,
    component: UpdateReview,
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
