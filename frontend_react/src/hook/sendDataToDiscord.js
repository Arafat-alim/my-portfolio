export const sendDataToDiscord = async ({
  data,
  color = "3447003",
  webhookUrl,
  title,
}) => {
  try {
    let prettifiedMessage = `\`\`\`json\n${JSON.stringify(
      data,
      null,
      2
    )}\n\`\`\``;

    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: title || "New Notification",
            description: prettifiedMessage, //
            color: color, // default color if none is provided
          },
        ],
      }),
    });
  } catch (error) {
    console.error("Error while sending data to Discord:", error);
  }
};
