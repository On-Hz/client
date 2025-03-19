import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { ALERT_TYPES } from "@/shared/constants";

// alert 타입에 따른 아이콘 컴포넌트와 클래스명을 매핑합니다.
const iconMap = {
  [ALERT_TYPES.SUCCESS]: {
    component: AiOutlineCheckCircle,
    className: "text-green-600",
  },
  [ALERT_TYPES.ERROR]: {
    component: AiOutlineCloseCircle,
    className: "text-red",
  },
  [ALERT_TYPES.WARNING]: {
    component: AiOutlineExclamationCircle,
    className: "text-amber-400",
  },
  [ALERT_TYPES.INFO]: {
    component: AiOutlineInfoCircle,
    className: "text-point",
  },
};

interface RenderIconProps {
  type: keyof typeof iconMap;
}

export const RenderIcon: React.FC<RenderIconProps> = ({ type }) => {
  const { component: IconComponent, className } =
    iconMap[type] || iconMap[ALERT_TYPES.INFO];

  return <IconComponent size={35} className={className} />;
};
