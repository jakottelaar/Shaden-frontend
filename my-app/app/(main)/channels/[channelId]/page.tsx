import DirectMessageContainer from "@/components/DirectMessageContainer";
import React from "react";

const DirectMessageOverview = ({
  params,
}: {
  params: { channelId: string };
}) => {
  const channelId = params.channelId;

  return <DirectMessageContainer channelId={parseInt(channelId)} />;
};

export default DirectMessageOverview;
