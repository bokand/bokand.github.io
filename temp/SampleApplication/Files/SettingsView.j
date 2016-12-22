
var xOffset = 30;
var itemGap = 15;
seperatorViewColor = [CPColor grayColor];
@implementation SettingsView : CPView {
  id                delegate;
  CPView            backgroundView              @accessors;
  CPRadio           radioButton1                @accessors;
  CPRadio           radioButton2                @accessors;
  var 				      selectedLangButton 		      @accessors;
  var               minimumDistanceField        @accessors;
  var               minimumDistanceLabel        @accessors;
  var               minimumDistanceErrorField   @accessors;
  var               pixelationDialogHeader      @accessors;
  var               unitLabel                   @accessors;
}

- (id)initWithFrame:(CGRect)inRect delegate:aDelegate{
  self = [super initWithFrame:inRect];
  if (self) {
    delegate = aDelegate;
    [self createBackgroundViewWithFrame:inRect];
    [self addSubview: backgroundView];
  }
  return self;
}

-(var)imperialRadioButton
{
  return radioButton1;
}

-(var)metricRadioButton
{
  return radioButton2;
}

-(CPView)createBackgroundViewWithFrame:(CGRect)aFrame {
  if (!backgroundView) {
    backgroundView = [[CPView alloc] initWithFrame:aFrame];
    [backgroundView setBackgroundColor:[CPColor blackColor]]
    [backgroundView setAutoresizingMask: CPViewMinXMargin | CPViewMaxXMargin | CPViewMinYMargin | CPViewMaxYMargin ];


    dialogHeader = [[CPTextField alloc] initWithFrame:CGRectMakeZero()];
    [dialogHeader setFont:[CPFont fontWithName:@"HPSimplified" size:15]];
    [dialogHeader setTextColor:[CPColor whiteColor]];
    [dialogHeader setFrameOrigin:CGPointMake(xOffset, xOffset)];
    [dialogHeader setStringValue:@"Measurements Settings"];
    [dialogHeader sizeToFit];
    [backgroundView addSubview:dialogHeader];

    var itemHeight = 35;
    var itemWidth = 200;
    var itemOriginY = CGRectGetMaxY([dialogHeader frame]) + 2*itemGap ;
    var seperatorWidth = CGRectGetWidth([self frame]) - 2*xOffset +15;

    radioButton1 = [[CPRadio alloc] initWithFrame:CGRectMake(xOffset, itemOriginY, itemWidth, itemHeight)];
    [radioButton1 setValue:[CPColor colorWithHexString:"FFFFFF"]
         forThemeAttribute:@"text-color"];
    [radioButton1 setTitle:@"Imperial System"];
    [radioButton1 sizeToFit];
    [radioButton1 setTarget:self];
    [radioButton1 setAction:nil];

    var frameSize = [radioButton1 frameSize];
    [radioButton1 setFrameSize:CGSizeMake(frameSize.width+5, frameSize.height)];

    [backgroundView addSubview:radioButton1];

    itemOriginY = CGRectGetMaxY([radioButton1 frame]) + itemGap ;
    radioButton2 = [[CPRadio alloc] initWithFrame:CGRectMake(xOffset, itemOriginY, itemWidth, itemHeight) radioGroup:[radioButton1 radioGroup]];
    [radioButton2 setValue:[CPColor colorWithHexString:"FFFFFF"]
         forThemeAttribute:@"text-color"];
    [radioButton2 setTitle:@"Metric System"];
    [radioButton2 sizeToFit];
    [radioButton2 setTarget:self];
    [radioButton2 setAction:nil];

    var frameSize = [radioButton2 frameSize];
    [radioButton2 setFrameSize:CGSizeMake(frameSize.width+5, frameSize.height)];

    [backgroundView addSubview:radioButton2];

    [radioButton1 setObjectValue:CPOnState];
    [radioButton2 setObjectValue:CPOffState];

    itemOriginY = CGRectGetMaxY([radioButton2 frame]) + itemGap ;

    var seperatorViewFrame = CGRectMake(xOffset,itemOriginY, seperatorWidth,2);

    // seperator view
    var seperatorView = [[CPView alloc] initWithFrame:seperatorViewFrame];
    [seperatorView setBackgroundColor:seperatorViewColor];
    [seperatorView setAutoresizingMask: CPViewMaxXMargin];
    [backgroundView addSubview:seperatorView];

    var nextFrame = [radioButton2 frame];

    itemOriginY = CGRectGetMaxY([seperatorView frame]) + itemGap ;

  	var languageDialogHeader = [[CPTextField alloc] initWithFrame:CGRectMakeZero()];
    [languageDialogHeader setFont:[CPFont fontWithName:@"HPSimplified" size:15]];
    [languageDialogHeader setTextColor:[CPColor whiteColor]];
    [languageDialogHeader setFrameOrigin:CGPointMake(xOffset , itemOriginY )];
    [languageDialogHeader setStringValue:@"Language Settings"];
    [languageDialogHeader sizeToFit];
    if (navigator.appVersion.indexOf("Win")!=-1)
    {
      languageDialogHeader._DOMElement.setAttribute("class", "diegoClass");
    }
    else
    {
      languageDialogHeader._DOMElement.setAttribute("class", "infoLabelTextField");
    }
    [backgroundView addSubview:languageDialogHeader];

    itemOriginY = CGRectGetMaxY([languageDialogHeader frame]) + itemGap ;

  	var label = [[CPTextField alloc] initWithFrame:CGRectMakeZero()];
    [label setStringValue: @"Language"];
    [label setTextColor:[CPColor whiteColor]];
    [label setFrameOrigin:CGPointMake(xOffset ,itemOriginY)];
    [label sizeToFit];
    [backgroundView addSubview:label];

    selectedLangButton = [[CPPopUpButton alloc] initWithFrame:CGRectMake(CGRectGetWidth([backgroundView frame])/2,itemOriginY, 120, 25) pullsDown:NO];
	  [self initializeLanguageSettings]
	  [backgroundView addSubview:selectedLangButton];

    nextFrame = [selectedLangButton frame];
    itemOriginY = CGRectGetMaxY([selectedLangButton frame]) + itemGap ;

    seperatorViewFrame = CGRectMake(xOffset,itemOriginY, seperatorWidth,2);
    var seperatorView2 = [[CPView alloc] initWithFrame:seperatorViewFrame];
    [seperatorView2 setBackgroundColor:seperatorViewColor];
    [seperatorView2 setAutoresizingMask: CPViewMaxXMargin];
    [backgroundView addSubview:seperatorView2];

    itemOriginY = CGRectGetMaxY([seperatorView2 frame]) + itemGap ;

    pixelationDialogHeader = [[CPTextField alloc] initWithFrame:CGRectMakeZero()] ;
    [pixelationDialogHeader setFont:[CPFont fontWithName:@"HPSimplified" size:15]];
    [pixelationDialogHeader setTextColor:[CPColor whiteColor]];
    [pixelationDialogHeader setFrameOrigin:CGPointMake(xOffset , itemOriginY )];
    [pixelationDialogHeader setStringValue: @"Pixelation Warning"];
    [pixelationDialogHeader sizeToFit];

    [backgroundView addSubview:pixelationDialogHeader];

    itemOriginY = CGRectGetMaxY([pixelationDialogHeader frame]) + itemGap ;


    minimumDistanceLabel = [[CPTextField alloc] initWithFrame:CGRectMakeZero()];
    [minimumDistanceLabel setStringValue: @"Minimum Distance"];
    [minimumDistanceLabel setTextColor:[CPColor whiteColor]];
    [minimumDistanceLabel setFrameOrigin:CGPointMake(xOffset , itemOriginY+4)];
    [minimumDistanceLabel sizeToFit];
    [backgroundView addSubview:minimumDistanceLabel];

    minimumDistanceField = [ErrorTextFieldView textFieldWithStringValue:""
                                                    placeholder: ""
                                                          width:120];
    [minimumDistanceField setFrameOrigin:CGPointMake(CGRectGetMaxX([minimumDistanceLabel frame]) , itemOriginY )];
    [minimumDistanceField setFrameSize:CGSizeMake(120,30)]
    [minimumDistanceField setTarget:self];
    [minimumDistanceField setAction:@selector(okButtonClicked:)];

     unitLabel = [[CPTextField alloc] initWithFrame:CGRectMakeZero()];
    [unitLabel setStringValue: @""];
    [unitLabel setTextColor:[CPColor whiteColor]];
    [unitLabel setFrameOrigin:CGPointMake(CGRectGetMaxX([minimumDistanceField frame]) + 3 , [minimumDistanceLabel frame].origin.y + 3)];
    [unitLabel sizeToFit];

    [backgroundView addSubview:unitLabel];
    [backgroundView addSubview:minimumDistanceField];

    maxWidth = Math.max(aFrame.size.width, CPRectGetMaxX([dialogHeader frame]), CPRectGetMaxX([radioButton1 frame]), CPRectGetMaxX([radioButton2 frame]));
    [backgroundView setFrameSize: CPSizeMake(maxWidth+20, CPRectGetHeight([backgroundView frame]))];
    [self setFrameSize: [backgroundView frameSize]];

    var buttonWidth = (CGRectGetWidth([backgroundView frame]) -2*xOffset - itemGap/2 ) / 2 ;
    var buttonHeight = 34 ;
    var buttonOriginY = CGRectGetHeight([backgroundView frame]) - xOffset - buttonHeight + itemGap/2;

    var doneButton = [[DiegoButton alloc] initWithFrame:CGRectMake(CGRectGetWidth([backgroundView frame])/2, buttonOriginY , buttonWidth , buttonHeight)];
    [doneButton setTitle:@"OK"];
    [doneButton setTarget:self];
    [doneButton setAction:nil];
    [backgroundView addSubview:doneButton];

    var cancelButton = [[DiegoButton alloc] initWithFrame:CGRectMake(xOffset , buttonOriginY,buttonWidth , buttonHeight)];
    [cancelButton setTitle:@"CANCEL"];
    [cancelButton setHighlightedState:NO];
    [cancelButton setTarget:delegate];
    [cancelButton setAction:nil];
    [backgroundView addSubview:cancelButton];
  }
  return backgroundView;
}

-(void)initializeLanguageSettings
{
	var langArrayKeys = [@"English",@"French",@"Arabic"];
  var languageValues = [@"en",@"fr",@"ar"];
	var langCount = 3
	var selLang = @"English";
	var i=0
	for(i=0;i<langCount;i++)
	{
		var selectedLangItem = nil;
	    selectedLangItem = [[CPMenuItem alloc] init];
		var title = [langArrayKeys objectAtIndex:i]
		var value = [languageValues objectAtIndex:i];
		[selectedLangItem setTitle:title];
		[selectedLangItem setTarget:delegate];
	    [selectedLangButton addItem:selectedLangItem];
		if(selLang == value)
			[selectedLangButton setSelectedIndex:i];
	 }
}

@end
