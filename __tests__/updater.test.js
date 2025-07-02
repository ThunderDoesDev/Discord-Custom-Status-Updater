const updater = require('../updater');
const fs = require('fs');

describe('startStatusUpdater', () => {
  afterEach(() => {
    updater.setStatuses([
      'YOUR STATUS HERE',
      'YOUR STATUS HERE',
      'YOUR STATUS HERE'
    ]);
    jest.restoreAllMocks();
  });

  test('logs error and does not start update when statuses array is empty', () => {
    updater.setStatuses([]);
    const appendSpy = jest.spyOn(fs, 'appendFileSync').mockImplementation(() => {});
    const updateStatusSpy = jest.spyOn(updater, 'updateStatus').mockImplementation(() => {});

    updater.startStatusUpdater();

    expect(appendSpy).toHaveBeenCalled();
    expect(updateStatusSpy).not.toHaveBeenCalled();
    const loggedMessage = appendSpy.mock.calls[0][1];
    expect(loggedMessage).toContain('No statuses defined');
  });
});
