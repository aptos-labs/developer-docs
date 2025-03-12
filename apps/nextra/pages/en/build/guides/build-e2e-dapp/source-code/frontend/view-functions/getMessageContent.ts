import { MODULE_ADDRESS } from "@/constants";
import { aptosClient } from "@/utils/aptosClient";

export const getMessageContent = async (): Promise<string> => {
  const content = await aptosClient()
    .view<[string]>({
      payload: {
        function: `${MODULE_ADDRESS}::message_board::get_message_content`,
      },
    })
    .catch((error) => {
      console.error(error);
      return ["message not exist"];
    });

  return content[0];
};
