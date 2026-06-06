export type NotificationItem = {
  id: string;
  type: "badge_creation" | string;
  title: string;
  body: string;
  is_read: boolean;
  extra_data: Record<string, unknown>;
  created_at: string;
};

export type NotificationsData = {
  notifications: NotificationItem[];
  total: number;
  page: number;
  limit: number;
  prev: string | null;
  next: string | null;
};

export type NotificationsResponse = {
  status: "success";
  message: string;
  data: NotificationsData;
};

export type UnreadNotificationCountData = {
  unread_count: number;
};

export type UnreadNotificationCountResponse = {
  status: "success";
  message: string;
  data: UnreadNotificationCountData;
};

export type MarkAllNotificationsReadData = {
  marked: number;
};

export type MarkAllNotificationsReadResponse = {
  status: "success";
  message: string;
  data: MarkAllNotificationsReadData;
};

export type MarkNotificationReadResponse = {
  status: "success";
  message: string;
  data: null;
};

export type NotificationTypeStyle = {
  bg: string;
  text: string;
};

export type NotificationMarkReadHandler = (
  notification: NotificationItem,
) => void;

export type NotificationDataProps = {
  onMarkRead?: NotificationMarkReadHandler;
  notifications: NotificationItem[];
};

export type NotificationRowProps = {
  notification: NotificationItem;
  onMarkRead: NotificationMarkReadHandler;
};

export type NotificationsEmptyStateConfig = {
  title: string;
  message: string;
  showDashboardLink?: boolean;
};

export type NotificationListProps = {
  notifications: NotificationItem[];
  emptyState: NotificationsEmptyStateConfig;
  onMarkRead: NotificationMarkReadHandler;
};

export type NotificationsTabValue = "all" | "unread";

export type NotificationsPaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  totalItems: number;
};
