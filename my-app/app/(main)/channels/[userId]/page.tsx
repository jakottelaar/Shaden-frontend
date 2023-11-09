import DirectMessageContainer from "@/components/DirectMessageContainer";
import React from "react";

const DirectMessageOverview = ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;

  return <DirectMessageContainer userId={userId.toString()} />;
};

export default DirectMessageOverview;
