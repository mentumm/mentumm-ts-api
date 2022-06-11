import Mixpanel from "mixpanel";

export const mixpanelEvent = (event: string, properties: any) => {
  const MIXPANEL_TOKEN = process.env.MIXPANEL_TOKEN || "";
  const mixpanel = Mixpanel.init(MIXPANEL_TOKEN);

  mixpanel.track(event, properties);

  console.log("token", MIXPANEL_TOKEN);
  console.log("event", event);
  console.log("props", properties);
};
