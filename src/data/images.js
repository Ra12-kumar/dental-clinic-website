// Stock photography (Unsplash). Each description matches what the photo shows.
const stock = (id, alt) => ({ id: `photo-${id}`, alt });

export const images = {
  consultation: stock("1606811841689-23dfddce3e95", "Dentist showing a dental X-ray on a screen to a seated patient"),
  operatory: stock("1629909613654-28e377c37b09", "Bright dental treatment room with chair and equipment"),
  twoChairs: stock("1445527815219-ecbfec67492e", "Dental room with two treatment chairs and natural light"),
  orangeChair: stock("1598256989800-fe5f95da9787", "Dental surgery with an orange treatment chair"),
  quietChair: stock("1642844819197-5f5f21b89ff8", "Dental chair and operating lamp in a treatment room"),
  examination: stock("1606811971618-4486d14f3f99", "Close-up of teeth being examined with a mirror and scaler"),
  instruments: stock("1606265752439-1f18756aa5fc", "Dental professional in a mask holding a probe and mouth mirror"),
  implantModel: stock("1593022356769-11f762e25ed9", "Model showing a dental implant beside natural tooth roots"),
  jawModel: stock("1468493858157-0da44aaf1d13", "Hands demonstrating on a model of teeth and gums"),
  xray: stock("1588776814546-1ffcf47267a5", "Dentist reviewing tooth scans on a light box"),
  digitalScan: stock("1600170311833-c2cf5280ce49", "Gloved hand pointing at a digital dental scan on a tablet"),
  smileScan: stock("1667133295315-820bb6481730", "Patient receiving a dental check with a smile scan on screen"),
  aligner: stock("1609840114035-3c981b782dfe", "Person fitting a clear aligner over their teeth"),
  toothbrushes: stock("1607613009820-a29f7bb81c04", "Wooden toothbrushes in a glass jar with eucalyptus leaves"),
};

export const imageUrl = (id, width) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`;
