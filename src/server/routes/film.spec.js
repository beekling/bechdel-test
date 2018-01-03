import mockingoose from 'mockingoose';
import fetchMock from 'fetch-mock';
import request from 'supertest';
import path from 'path';
import app from '../server';
import URLFormatter from '../methods/getFilmData/URLFormatter';
import mockGetSimpleCastData from '../methods/getFilmData/__mocks__/mock-simple-data.json';
import mockGetFullCastData from '../methods/getFilmData/__mocks__/mock-full-data.json';
import mockImagesData from '../methods/getFilmData/__mocks__/mock-images-data.json';

const { createSimpleDataURL, createFullDataURL, createImageUrl } = URLFormatter;

// jest.mock('../methods/getFilmData/getFilmData');
jest.mock('../methods/script');

describe('Film Routes Test', () => {
	beforeEach(() => {
		mockingoose.resetAll();
		fetchMock.reset();
	});

	describe('GET /api/film', () => {
		it('should send JSON with an array of films', done => {
			const _doc = { title: 'American Hustle 2' };
			mockingoose.Film.toReturn(_doc, 'find');

			const expectedResponse = {
				_id: expect.any(String),
				actors: [],
				createdAt: expect.any(String),
				directors: [],
				genres: [],
				title: 'American Hustle 2',
				writers: [],
			};

			request(app)
				.get('/api/film')
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					expect(res.body).toMatchObject(expectedResponse);
					return done();
				});
		});
	});

	describe('POST /api/film/ already in the database', () => {
		it('should return the film', done => {
			const testScript = path.join(__dirname, '../../../scripts/boyhood.txt');
			const title = 'Boyhood';
			const imdbID = 'tt1065073';
			const _doc = { title, test: true };
			mockingoose.Film.toReturn(_doc, 'find');
			mockingoose.Film.toReturn({}, 'save');

			const simpleURL = createSimpleDataURL(title);
			const fullURL = createFullDataURL(imdbID);
			const imagesURL = createImageUrl(imdbID);

			fetchMock.mock(simpleURL, mockGetSimpleCastData);
			fetchMock.mock(fullURL, mockGetFullCastData);
			fetchMock.mock(imagesURL, mockImagesData);

			request(app)
				.post('/api/film')
				.attach('script', testScript)
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					expect(typeof res.body.title).toBe('string');
					return done();
				});
		});
	});

	describe('GET /api/film/:id', () => {
		it('should send JSON with a single film', done => {
			const _id = '5a2f044e491eef5edab46b85';
			const title = 'American Hustle 2';
			const _doc = {
				_id: '5a2f044e491eef5edab46b85',
				title,
			};
			mockingoose.Film.toReturn(_doc, 'find');

			const expectedResponse = {
				_id: expect.any(String),
				actors: [],
				createdAt: expect.any(String),
				directors: [],
				genres: [],
				title: 'American Hustle 2',
				writers: [],
			};

			request(app)
				.get(`/api/film/${_id}`)
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					expect(res.body).toBeTruthy();
					expect(res.body.title).toEqual(title);
					expect(res.body).toMatchObject(expectedResponse);
					return done();
				});
		});
	});

	describe('DELETE /api/film/:id', () => {
		it('should return success:true after deleting movie from the database', done => {
			const id = 1234;
			const _doc = { id: 1234, title: 'American Hustle 2' };

			mockingoose.Film.toReturn(_doc, 'findOne').toReturn(true, 'remove');

			request(app)
				.del(`/api/film/${id}`)
				.expect(200)
				.expect('Content-Type', /json/)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					expect(typeof res.body).toBe('object');
					return done();
				});
		});
	});
});
