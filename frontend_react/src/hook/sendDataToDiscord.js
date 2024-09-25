export const sendDataToDiscord = async ({
  data,
  color = "3447003",
  webhookUrl,
  title,
}) => {
  try {
    const mySite = process.env.REACT_APP_PORTFOLIO_WEBSITE;
    let prettifiedMessage = `\`\`\`json\n${JSON.stringify(
      data,
      null,
      2
    )}\n\`\`\``;

    if (!data || !webhookUrl || !title) {
      return;
    }

    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: `${title}--${mySite}` || `New Notification from ${mySite}`,
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
