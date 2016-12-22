
WallpaperCategory      = "wallpaper";
WallpaperProductName   = "WALL_COVERING";


@import <Foundation/Foundation.j>
@import <AppKit/AppKit.j>
@import "../SampleApplication/Files/DiegoButton.j"
@import "../SampleApplication/Files/ErrorTextFieldView.j"
@import "../SampleApplication/Files/NewProjectView.j"
@import "../SampleApplication/Files/ProjectDetailsView.j"
@import "../SampleApplication/Files/SettingsView.j"

@implementation AppController : CPObject
{
    id  saveProjectDialog @accessors;
    id  contentView @accessors;
    var settingsView;
}

- (void)applicationDidFinishLaunching:(CPNotification)aNotification
{
    var theWindow = [[CPWindow alloc] initWithContentRect:CGRectMakeZero() styleMask:CPBorderlessBridgeWindowMask];
    self.contentView = [theWindow contentView];

    saveProjectDialog = [[NewProjectView alloc] initWithFrame:CGRectMake(0,0,500,465) delegate:self];
    [saveProjectDialog setCenter:[contentView center]];

    [self.contentView addSubview:saveProjectDialog];
    [saveProjectDialog showDetailsViewWithCategory:WallpaperCategory]

    [theWindow orderFront:self];
}

- (void)showSettingsView
{
  settingsView = [[SettingsView alloc] initWithFrame:CGRectMake(0, 0, 395, 300 + 115) delegate:self];
  [saveProjectDialog removeFromSuperview];
  [settingsView setCenter:[contentView center]];
  [self.contentView addSubview:settingsView];
}

@end
