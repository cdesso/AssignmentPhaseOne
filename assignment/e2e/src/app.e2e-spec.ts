import { AppPage } from './app.po';
import { browser, logging, by, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    browser.waitForAngularEnabled(false);
    expect(page.getTitleText()).toEqual('GrifChat');
  });

  it('should fail to login', () => {
    var username = element(by.id('username'));
    var password = element(by.id('password'));
    var error = element(by.id('error'));
    var submit = element(by.id('submit'));
    username.sendKeys('super');
    password.sendKeys('admin2');
    submit.click();
    browser.driver.sleep(100);
    expect(error.getText()).toEqual('Invalid username or password');
  });

  it('should successfully login', () => {
    var username = element(by.id('username'));
    var password = element(by.id('password'));
    var submit = element(by.id('submit'));
    username.sendKeys('super');
    password.sendKeys('admin');
    submit.click();
    browser.driver.sleep(200);
    var loginName = browser.driver.executeScript("return window.sessionStorage.getItem('username');");
    browser.driver.sleep(100);

    expect(loginName).toEqual('super');
  });

  it('should add new group and find it(Group1)', () => {
    browser.driver.sleep(200);
    element(by.id('addGroup')).click(); // Click 'Add new group'
    browser.driver.sleep(200);
    var groups = element.all(by.id('groups')).all(by.css('button')); // Find groups
  
    expect(groups.get(0).getText()).toEqual('Group1');
  });

  it('should rename "Group1" to "Main"', () => {
    var groups = element.all(by.id('groups')).all(by.css('button')); // Find groups
    groups.get(0).click(); // Click on the first group
    element(by.id('groupButton')).click(); // Open group admin menu
    element(by.id('renameButton')).click(); // Open rename form
    element(by.id('newGroupName')).sendKeys('Main'); // Enter new name into form
    element(by.id('submitGroupName')).click(); // Submit new name
    browser.driver.sleep(500);
    browser.driver.switchTo().alert().dismiss(); // Dismiss alert
    var groups = element.all(by.id('groups')).all(by.css('button')); // Find groups again
    expect(groups.get(0).getText()).toEqual('Main');
  });

  it('should add a user to "Main"', () => {
    browser.driver.sleep(200);
    element(by.id('inviteGroup')).click(); // Open invitation form
    browser.driver.sleep(200);
    element(by.id('inviteGroupField')).click(); // Open dropdown menu
    var user = element.all(by.id('inviteGroupUser'));
    user.get(0).click(); // Select first user on dropdown
    browser.driver.sleep(200);
    element(by.id('submitGroupInvite')).click();
    browser.driver.sleep(200);
    browser.driver.switchTo().alert().dismiss(); // Dismiss alert
    element(by.id('deleteFromGroup')).click(); // Open delete form
    browser.driver.sleep(200);
    element(by.id('deleteGroupField')).click(); // Open dropdown menu
    browser.driver.sleep(200);
    var users = element.all(by.id('deleteGroupUser'));
    
    expect(users.get(0).getText()).toEqual('super');
  });

  it('should remove a user from "Main"', () => {
    var users = element.all(by.id('deleteGroupUser'));
    users.get(0).click(); // Select first user on dropdown
    browser.driver.sleep(200);
    element(by.id('submitGroupDelete')).click();
    browser.driver.sleep(200);
    var alert = browser.driver.switchTo().alert(); // Get alert

    expect(alert.getText()).toEqual('super removed from Main');
    alert.dismiss();
  });


  it('should find General channel for Group1', () => {
    var channels = element.all(by.id('channels')); // Find channels
    expect(channels.get(0).getText()).toEqual('General'); // First channel should be General
  });

  it('should add user to "General" in "Main"', () => {
    browser.driver.sleep(200);
    element(by.id('JoinChannel')).click();
    var channels = element.all(by.id('channels')); // Find channels
    channels.get(0).click(); // Select General
    browser.driver.sleep(200);
    element(by.id('channelButton')).click(); // Open channel admin menu
    element(by.id('inviteChannel')).click(); // Open invite form
    browser.driver.sleep(200);
    element(by.id('inviteChannelField')).click(); // Select invite users to General
    var users = element.all(by.id('inviteChannelUser'));
    users.get(1).click();
    element(by.id('submitChannelInvite')).click();
    browser.driver.sleep(200);
    var alert = browser.driver.switchTo().alert(); // Get alert

    expect(alert.getText()).toEqual('axela added to General');
    alert.dismiss();
  });

  it('should remove a user from "General"', () => {
    element(by.id('deleteFromChannel')).click(); // Open delete form
    browser.driver.sleep(200);
    element(by.id('deleteChannelField')).click(); // Open dropdown menu
    browser.driver.sleep(200);
    var users = element.all(by.id('deleteChannelUser'));
    users.get(0).click(); // Select first user on dropdown
    element(by.id('submitChannelDelete')).click();
    browser.driver.sleep(200);
    var alert = browser.driver.switchTo().alert(); // Get alert

    expect(alert.getText()).toEqual('axela removed from General in Main');
    alert.dismiss();
  });

  it('should add new channel to Main', () => {
    element(by.id('addChannel')).click(); // Click 'Create new channel'
    browser.driver.sleep(200);
    element(by.id('JoinChannel')).click();
    var channels = element.all(by.id('channels')); // Find channels
    browser.driver.sleep(200);
  
    expect(channels.get(1).getText()).toEqual('Channel2');
  });

  it('should delete "Channel2" from "Main"', () => {
    var channels = element.all(by.id('channels')); // Find channels
    browser.driver.sleep(200);
    channels.get(1).click(); // Select channel
    element(by.id('deleteChannel')).click(); // Delete channel
    browser.driver.sleep(200);
    var channels = element.all(by.id('channels')); // Find channels
    
    expect(channels.count()).toEqual(1); // Only one channel should remain
  });

  it('should join "General" in "Main"', () => {
    element(by.id('JoinChannel')).click();
    var channels = element.all(by.id('channels')); // Find channels
    browser.driver.sleep(200);
    channels.get(0).click(); // Select channel
    element(by.id('joinChannelButton')).click(); // Delete channel
    browser.driver.sleep(500);
    var room = element(by.css('h5'));
    
    expect(room.getText()).toEqual("You are chatting in Main > General"); // Only one channel should remain
  });

  it('should show number of active users in room', () => {
    var room = element(by.id('counter'));
    
    expect(room.getText()).toEqual("Active users in channel: 1"); // Only one channel should remain
  });

  it('should delete "Main"', () => {
    element(by.id('leaveRoom')).click() // Leave chat room
    browser.driver.sleep(5000);
    var groups = element.all(by.id('groups')).all(by.css('button')); // Find groups
    groups.get(0).click(); // Click on first group
    browser.driver.sleep(200);
    var deleteGroup = element(by.id('deleteGroup'));
    deleteGroup.click(); // Delete first group
    browser.driver.sleep(200);
    var groups = element.all(by.id('groups')).all(by.id('button')); // Find groups again
    expect(groups.count()).toEqual(0); // Expect no groups
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
