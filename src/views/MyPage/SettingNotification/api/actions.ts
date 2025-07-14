"use server";

import type { NotificationSettingRequestDTO } from "@/entities/user/api/user.interface";
import { updateNotificationSettingsApi } from "@/entities/user/api/user.server-mutations";

export const updateNotificationSettingsAction = async (body: NotificationSettingRequestDTO) => {
  return await updateNotificationSettingsApi(body);
};
