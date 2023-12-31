import { setCookie, getCookie } from "cookies-next";

export async function VerifyTransaction(query: any) {
  let verifiedData = await fetch(
    "https://sandbox.przelewy24.pl/api/v1/transaction/verify",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic Mjc0MDc6MWI2NDdjYTJjYjRkZGI0ZmFmY2Q3NjgzZmM0MGZiYTY=",
      },
      body: query,
    },
  );

  console.log(verifiedData);

  let statusMassage;

  const sendEmail = async (ObiectForMail: any) => {
    const dataForMail = JSON.stringify({
      from: ObiectForMail.orders[0].From,
      to: ObiectForMail.orders[0].To,
      name: ObiectForMail.orders[0].firstName,
      lastname: ObiectForMail.orders[0].lastName,
    });

    // if (!router.asPath.includes("email")) {
    let mail = await fetch("/api/sendnotification", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: dataForMail,
    });
    const data = await mail;
    // router.push("?email=true", undefined, { shallow: true });
  };

  if (verifiedData.status === 200) {
    const statusMessageToJSON = await verifiedData.json();
    statusMassage = await statusMessageToJSON.data.status;

    //send mail after succesed process
    if (statusMassage === "success") {
      const queryToParse = JSON.parse(query);
      const SesionIdFromQuery = queryToParse.sessionId;
      setCookie("P24", SesionIdFromQuery);
      const dataFromDG = await fetch("/api/mongoget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: SesionIdFromQuery,
      });
      const ObiectForMail = await dataFromDG.json();
      sendEmail(ObiectForMail);
      console.log(await ObiectForMail);
      console.log(await statusMessageToJSON.data.status);
      const final = await verifiedData.status;
      return final;
    } else {
      console.log(statusMassage);
      return false;
    }
  }

  const SessionID = getCookie("P24");
  console.log(SessionID);
  // };
}

export default VerifyTransaction;
