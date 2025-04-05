import documentTypeModel from '../models/documentType/index.js';

const seeddocumentType = async (t) => {
  const documentTypes = await documentTypeModel.bulkCreate(
    [
      {
        name: 'proposal',
      },
      { name: 'quote' },
      { name: 'contract' },
    ],
    { transaction: t }
  );
  console.log('document types seeded successfully');
  return documentTypes;
};

// seeddocumentType();

export default seeddocumentType;
