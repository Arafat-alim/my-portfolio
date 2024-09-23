export const sendDataToDiscord = async (data, color) => {
  try {
    let prettifiedMessage = `\`\`\`json\n${JSON.stringify(
      data,
      null,
      2
    )}\n\`\`\``;

    const webhookUrl = process.env.REACT_APP_DISCORD_WEBHOOK_VISITORS;

    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "New Visitor Notification",
            description: prettifiedMessage, //
            color: color || 3447003, // default color if none is provided
          },
        ],
      }),
    });
  } catch (error) {
    console.error("Error while sending data to Discord:", error);
  }
};
