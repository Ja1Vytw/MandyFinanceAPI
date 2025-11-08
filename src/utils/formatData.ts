export const formatDocument = (doc: any): any => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    ...obj,
    id: obj._id ? obj._id.toString() : obj.id,
  };
};

export const formatDocuments = (docs: any[]): any[] => {
  return docs.map(formatDocument);
};

