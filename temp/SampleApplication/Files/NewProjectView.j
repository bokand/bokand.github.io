var xOffset       = 30;
var yOffset       = 20;
var WindowWidth   = 500;
var WindowHeight  = 465;
var edgeOffset    = 10;
var rightOffset   = 40;
var buttonWidth   = 200;
var buttonHeight  = 34;
var labelWidth = 170;


@implementation NewProjectView : CPView {
  id                      delegate              @accessors;
  CPButton                startDesigningButton  @accessors;
  ContentsCollectionView  projectTypesView      @accessors;
  CPView                  projectDetailsView    @accessors;
  CPTextField             projectCategoryLabel  @accessors;
  CPView                  overlayView;
  CPView                  contentView;
  var                     selectedIndex;
  CPImageView             categoryIconView;
}

- (id)initWithFrame:(CPRect)aFrame delegate:(id)inDelegate{

  self = [super initWithFrame:aFrame]
  if(self){
     selectedIndex = -1;
     delegate = inDelegate;
     [self setAutoresizingMask: CPViewHeightSizable | CPViewWidthSizable ]
     [self setBackgroundColor:[CPColor clearColor]];
  	 [self drawContents];
  }

  return self;
}

- (void)drawContents{
  // Main View UI
  var contentFrame = CGRectMake(0, 0, WindowWidth, WindowHeight)
  contentView = [[CPView alloc] initWithFrame:contentFrame];
  [contentView setAutoresizingMask: CPViewMinXMargin | CPViewMaxXMargin | CPViewMinYMargin | CPViewMaxYMargin ]
  [self addSubview:contentView];
  [contentView setBackgroundColor: [CPColor colorWithRed:51/255
                                            green:51/255
                                             blue:51/255
                                            alpha:1.0]];

  projectCategoryLabel = [[CPTextField alloc] initWithFrame:CGRectMakeZero()];
  [projectCategoryLabel setTextColor:[CPColor whiteColor]];
  [projectCategoryLabel setStringValue:@"WallCovering"];
  [projectCategoryLabel setFont:[CPFont fontWithName:@"HPSimplified" size:22]];
  [projectCategoryLabel sizeToFit];
  [projectCategoryLabel setFrameOrigin:CGPointMake(xOffset, yOffset+5)]

  [contentView addSubview:projectCategoryLabel];

  // Select the project you want to start Label
  var selectProjectTF = [[CPTextField alloc] initWithFrame:CGRectMake(xOffset, CGRectGetMaxY([projectCategoryLabel frame]) + 30, WindowWidth, 0)];
  [selectProjectTF setTextColor:[CPColor whiteColor]];
  [selectProjectTF setStringValue:@"Select Project Label"];
  [selectProjectTF setLineBreakMode:CPLineBreakByWordWrapping];
  [selectProjectTF setFont:[CPFont fontWithName:@"HPSimplified" size:14]];
  [selectProjectTF sizeToFit];
  [contentView addSubview:selectProjectTF];

  //Next Step Seperator View Layout
  var  nextStepSeparatorView  = [[CPView alloc] initWithFrame:CGRectMake(xOffset,CGRectGetMaxY([selectProjectTF frame]) + edgeOffset,WindowWidth - 2 * xOffset, 1)];
  [nextStepSeparatorView setBackgroundColor:[CPColor colorWithRed:117/255
                                                            green:117/255
                                                             blue:117/255
                                                            alpha:1.0]];
  [contentView addSubview:nextStepSeparatorView];

  //Next Step  View Layout
  var nextStepTF = [[CPTextField alloc] initWithFrame:CGRectMake(xOffset, CGRectGetMaxY([selectProjectTF frame]) + yOffset, WindowWidth, 0)];
  [nextStepTF setTextColor:[CPColor colorWithRed:153/255
                                           green:153/255
                                            blue:153/255
                                           alpha:1.0]];
  [nextStepTF setStringValue:@"Next"];
  [nextStepTF setFont:[CPFont fontWithName:@"HPSimplified" size:14]];
  [nextStepTF sizeToFit];
  [contentView addSubview:nextStepTF];

  //Terms and Conditions Label
  var termsAndConditionsTF = [[CPTextField alloc] initWithFrame:CGRectMake(xOffset, CGRectGetHeight([contentView frame]) - 35, [nextStepSeparatorView frameSize].width, xOffset+10)];
  [termsAndConditionsTF setTextColor:[CPColor colorWithRed:153/255
                                           green:153/255
                                            blue:153/255
                                           alpha:1.0]];

  var copyRightYearString = [CPString stringWithFormat:@"2016"];
  var termsAndConditionsTFString = [CPString stringWithFormat:@"%@ - Privacy statement", copyRightYearString];
  [termsAndConditionsTF setStringValue:termsAndConditionsTFString];
  [termsAndConditionsTF setLineBreakMode:CPLineBreakByWordWrapping];
  [termsAndConditionsTF setFont:[CPFont fontWithName:@"HPSimplified" size:10]];
  termsAndConditionsTF._DOMElement.setAttribute("class", "diegoClass");
  [contentView addSubview:termsAndConditionsTF];

  //T&C Seperator View Layout
  var termsAndConditionsSeperatorView  = [[CPView alloc] initWithFrame:CGRectMake(xOffset,CGRectGetMinY([termsAndConditionsTF frame]) - edgeOffset,WindowWidth - 2 * xOffset, 1)];
  [termsAndConditionsSeperatorView setBackgroundColor:[CPColor colorWithRed:117/255
                                                                      green:117/255
                                                                       blue:117/255
                                                                      alpha:1.0]];
  [contentView addSubview:termsAndConditionsSeperatorView];

  //LatexWallDesigner Label
  var latexWallDesignerLabel = [[CPTextField alloc] initWithFrame:CGRectMake(xOffset + 3,CGRectGetMinY([termsAndConditionsSeperatorView frame])- rightOffset,WindowWidth - rightOffset, xOffset)];
  [latexWallDesignerLabel setTextColor:[CPColor whiteColor]];
  [latexWallDesignerLabel setStringValue:@"Wallart Designer Label"];
  [latexWallDesignerLabel setLineBreakMode:CPLineBreakByWordWrapping];
  [latexWallDesignerLabel setFont:[CPFont boldFontWithName:@"HPSimplified" size:14]];
  [latexWallDesignerLabel sizeToFit];
  var height = [latexWallDesignerLabel frameSize].height
  [latexWallDesignerLabel setFrameOrigin:CGPointMake([latexWallDesignerLabel frameOrigin].x, CGRectGetMinY([termsAndConditionsSeperatorView frame])- rightOffset-(height/2))]
  [contentView addSubview:latexWallDesignerLabel];

  //StartDesigning Button

  startDesigningButton = [DiegoButton buttonWithTitle:@"Start Designing >>" theme:[CPTheme defaultTheme]];
  [startDesigningButton setFrame:CGRectMake(CGRectGetMaxX([termsAndConditionsSeperatorView frame]) - buttonWidth,CGRectGetMidY([latexWallDesignerLabel frame])-buttonHeight/2,buttonWidth,buttonHeight)];
  [startDesigningButton setFont:[CPFont fontWithName:@"HPSimplified" size:15]];
  [startDesigningButton setAlignment:CPCenterTextAlignment];
  [startDesigningButton setTarget:self]
  [startDesigningButton setAction:@selector(actionStartDesigning:)]
  [startDesigningButton setEnabledState:NO]
  [contentView addSubview:startDesigningButton]
}

-(void)showDetailsViewWithCategory:(CPString)inCategory{
  if(!projectDetailsView){
      projectDetailsView = [[ProjectDetailsView alloc] initWithFrame:CGRectMake(xOffset,CGRectGetMaxY([projectCategoryLabel frame]) + xOffset ,WindowWidth - 2*xOffset,260) delegate:self];
  }
  if ([[projectDetailsView projectNameField] stringValue])
  {
    [self enableOrDisableStartButton:YES];
  }
  [projectDetailsView setProjectName:inCategory];
  [projectCategoryLabel setStringValue:[self productName:inCategory]]
  [projectCategoryLabel sizeToFit];
  [contentView addSubview:projectDetailsView];
}

-(CPString)productName:(CPString)inCategory{
  switch(inCategory){
    case WallpaperCategory: return WallpaperProductName;
                            break;
    case PosterCategory: return PosterProductName;
                            break;
    case CanvasCategory: return CanvasProductName;
                            break;
    case CutoutCategory: return CutoutProductName;
                            break;
  }
}

-(void)actionStartDesigning:(id)sender{
  [delegate showSettingsView];
}


-(id)getProjectCategory{
    return WallpaperCategory
}

- (void)enableOrDisableStartButton:(BOOL)aFlag
{
  [startDesigningButton setEnabledState:aFlag];
}

-(id)emailTextField{
  return [projectDetailsView emailTextField];
}
@end
