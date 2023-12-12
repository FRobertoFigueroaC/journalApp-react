import { fileUpload } from '../../src/helpers/fileUpload';
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
  cloud_name: 'robertofc-cursos',
  api_key: '368282432271884',
  api_secret: 'VqwUSo2o4mrzNoLlcFTqTSWUh9Q',
  secure: true,
});

describe('fileUpload tests', () => {


  test.skip('should upload a file to cloudinary', async () => { 
    const extension = 'png';
    const imgURL = `https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.${extension}`;
    const resp = await fetch(imgURL);
    const blob = await resp.blob();
    const file = new File([blob],'testing-photo.jpg');

    const url = await fileUpload(file);
    expect(typeof url).toBe('string');

    // Delete file
    const segments =  url.split('/');
    const imageId = segments[segments.length - 1].replace(`.${extension}`, '');

    const cloudResp = await cloudinary.api.delete_resources([`journal/${imageId}`, {
      resouce_type: 'image'
    }]);
   });

   test.skip('should return null', async() => {
      const file = new File([], 'foto.jpg');
      const url = await fileUpload( file );
      expect( url ).toBe( null );
    });
});