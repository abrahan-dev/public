import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import assert from 'assert';
import * as fs from 'fs';
import request from 'supertest';

import container from '../../../../../../src/apps/frontoffice/backend/createContainer';
import { FrontofficeBackendApp } from '../../../../../../src/apps/frontoffice/backend/FrontofficeBackendApp';
import { EnvironmentArranger } from '../../../../../contexts/shared/infrastructure/arranger/EnvironmentArranger';

let _request: request.Test;
let application: FrontofficeBackendApp;
let _response: request.Response;
let environmentArranger: EnvironmentArranger;

Given('I send a GET request to {string}', (route: string) => {
    _request = request(application.httpServer).get(route);
});

Then('the response status code should be {int}', async (status: number) => {
    _response = await _request.expect(status);
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
    _request = request(application.httpServer)
        .put(route)
        .send(JSON.parse(body) as object);
});

Then('the response should be empty', () => {
    assert.deepStrictEqual(_response.body, {});
});

Then('the response content should be:', (response: string) => {
    assert.deepStrictEqual(_response.body as string, JSON.parse(response));
});

BeforeAll(async () => {
    environmentArranger = await container.get<Promise<EnvironmentArranger>>('Context.Frontoffice.EnvironmentArranger');
    await environmentArranger.arrange();

    application = new FrontofficeBackendApp();
    void application.start();
});

AfterAll(async () => {
    const temporaryFilesPath = `${__dirname}/../../files/`;
    try {
        const regex = /[.]repo$/;
        fs.readdirSync(temporaryFilesPath)
            .filter(f => regex.test(f))
            .map(f => fs.unlinkSync(temporaryFilesPath + f));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(`Temporary files do not exist in the path: <${temporaryFilesPath}>`);
    }

    await application.stop();
});
