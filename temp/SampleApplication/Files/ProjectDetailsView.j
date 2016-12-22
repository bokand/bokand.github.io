var xOffset              = 20;
var yOffset              = 13;
var rightEdgeOffset      = 40;
var emailTextFieldWidth  = 250;
var emailTextFieldHeight = 30;
var projectNameFieldHeight = 40;

@implementation ProjectDetailsView : CPView {

  id                     delegate                  @accessors;
	CPView			           nameView	                 @accessors;
  CPView                 emailView                 @accessors;
  CPString               projectName               @accessors;
  ErrorTextFieldView     projectNameField          @accessors;
  ErrorTextFieldView     emailTextField            @accessors;
  CPTextField            errorDisplayTextField     @accessors;


}

- (id)initWithFrame:(CPRect)aFrame delegate:(id)inDelegate{
  self = [super initWithFrame:aFrame];
  if(self){
     delegate = inDelegate;
     [self setBackgroundColor: [CPColor colorWithRed:51/255
                                               green:51/255
                                                blue:51/255
                                               alpha:1.0]];

  	 [self drawContents];
  }
  return self;
}

- (void)drawContents{

	//Name View
	nameView = [[CPView alloc] initWithFrame:CGRectMake(0,yOffset, [self frameSize].width, 0)];
	[nameView setBackgroundColor:[CPColor colorWithRed:153/255
                                            	 green:153/255
                                                blue:153/255
                                               alpha:1.0]];
	[self addSubview:nameView];

	// Name your project TF
	var nameYourProjectTF = [[CPTextField alloc] initWithFrame:CGRectMake(xOffset, yOffset ,[self frameSize].width, xOffset)];
  [nameYourProjectTF setTextColor:[CPColor whiteColor]];
  [nameYourProjectTF setStringValue:@"Project Name"];
  [nameYourProjectTF setFont:[CPFont fontWithName:@"HPSimplified" size:14]];
  [nameYourProjectTF sizeToFit];
  [nameView addSubview:nameYourProjectTF];

  // Project name field
  projectNameField = [ErrorTextFieldView textFieldWithStringValue:""
                   				                            placeholder:@"Enter your project name"
                                                            width:60];
  [projectNameField setFrame:CGRectMake(xOffset,CGRectGetMaxY([nameYourProjectTF frame]) + 5,CGRectGetWidth([nameView frame]) - 2*xOffset,projectNameFieldHeight)]
  [projectNameField setDelegate:self];
  [projectNameField setBezeled:NO];
  [projectNameField setFont:[CPFont fontWithName:@"HPSimplified" size:14]];
  [projectNameField setBackgroundColor:[CPColor whiteColor]];
  [projectNameField setVerticalAlignment:CPCenterTextAlignment];
  [projectNameField sizeToFit];
  [[CPNotificationCenter defaultCenter] addObserver:self selector:@selector(textDidChange:) name:CPControlTextDidChangeNotification object:projectNameField];
  [projectNameField setTarget:delegate];
  [nameView addSubview:projectNameField];

  var nameViewHeight = CGRectGetMaxY([projectNameField frame]) + yOffset;
  [nameView setFrameSize:CGSizeMake([nameView frameSize].width,nameViewHeight)]


  //Email View
  emailView = [[CPView alloc] initWithFrame:CGRectMake(0,CGRectGetMaxY([nameView frame])+yOffset, [self frameSize].width - rightEdgeOffset, 0)];
  [emailView setBackgroundColor:[CPColor colorWithRed:75/255
                                               green:75/255
                                                blue:75/255
                                               alpha:1.0]];
  [self addSubview:emailView];

  //Receive link Description Label
  var recieveLinkDescriptionLabel = [[CPTextField alloc] initWithFrame:CGRectMake(xOffset, yOffset ,[emailView frameSize].width, xOffset)];
  [recieveLinkDescriptionLabel setTextColor:[CPColor whiteColor]];
  [recieveLinkDescriptionLabel setStringValue:@"Please add the email of your customer to share it with him."];
  [recieveLinkDescriptionLabel setFont:[CPFont fontWithName:@"HPSimplified" size:14]];
  [recieveLinkDescriptionLabel sizeToFit];
  [emailView addSubview:recieveLinkDescriptionLabel];

  //email Label
  var emailLabel = [[CPTextField alloc] initWithFrame:CGRectMakeZero()];
  [emailLabel setStringValue:@"EMAIL"];
  [emailLabel setTextColor:[CPColor whiteColor]];
  [emailLabel setFrameOrigin:CGPointMake(xOffset,CGRectGetMaxY([recieveLinkDescriptionLabel frame])+20)]
  [emailLabel sizeToFit];
  [emailView addSubview:emailLabel];

  //email TextField
  emailTextField = [ErrorTextFieldView textFieldWithStringValue:""
                                                      placeholder:@"name@mydomain.com"
                                                            width:60];
  [emailTextField setFrame:CGRectMake(CGRectGetMaxX([emailLabel frame])+xOffset, CGRectGetMaxY([recieveLinkDescriptionLabel frame])+10 ,emailTextFieldWidth, emailTextFieldHeight)]
  [emailTextField setBackgroundColor:[CPColor whiteColor]];
  [emailTextField setDelegate:self]
  [emailTextField setBezeled:NO];
  [emailTextField setFont:[CPFont fontWithName:@"HPSimplified" size:12]];
  [emailTextField sizeToFit];
  [[CPNotificationCenter defaultCenter] addObserver:self selector:@selector(textDidChange:) name:CPControlTextDidChangeNotification object:emailTextField];
  [emailTextField setVerticalAlignment:CPCenterTextAlignment];
  [emailTextField setTarget:delegate];
  emailTextField._DOMElement.setAttribute("class", "diegoPlaceholder");
  [emailView addSubview:emailTextField];

  //Receive email Description Label
  var receiveEmailDescriptionTextField = [[CPTextField alloc] initWithFrame:CGRectMake(CGRectGetMinX([emailTextField frame]), CGRectGetMaxY([emailTextField frame])+5 ,[emailView frameSize].width-CGRectGetMinX([emailTextField frame]), rightEdgeOffset)]
  [receiveEmailDescriptionTextField setStringValue:@"I understand that this email recipient will receive email from or from the Print Service Provider"];
  [receiveEmailDescriptionTextField setTextColor:[CPColor whiteColor]]
  [receiveEmailDescriptionTextField setFont:[CPFont fontWithName:@"HPSimplified" size:12]];
  [receiveEmailDescriptionTextField setLineBreakMode:CPLineBreakByWordWrapping];
  [receiveEmailDescriptionTextField sizeToFit];
  [emailView addSubview:receiveEmailDescriptionTextField];

  errorDisplayTextField = [[CPTextField alloc] initWithFrame:CGRectMake(CGRectGetMinX([emailTextField frame]),CGRectGetMaxY([receiveEmailDescriptionTextField frame])  ,CGRectGetWidth([self frame]) - 20, 20)]
  [errorDisplayTextField setTextColor:[CPColor redColor]];
  [errorDisplayTextField setStringValue:@""];
  [errorDisplayTextField setLineBreakMode:CPLineBreakByWordWrapping];
  [errorDisplayTextField setFont:[CPFont fontWithName:@"HPSimplified" size:12]];
  [errorDisplayTextField sizeToFit];
  [emailView addSubview:errorDisplayTextField];

  //calculate and set emailView height
  var emailViewHeight = CGRectGetMaxY([recieveLinkDescriptionLabel frame]) + CGRectGetMaxY([emailTextField frame]) + CGRectGetMaxY([receiveEmailDescriptionTextField frame])+yOffset;
  [emailView setFrameSize:CGSizeMake([nameView frameSize].width,emailViewHeight)]
}


- (void)textDidChange:(CPNotification)inNotification
{
  if([projectNameField stringValue] == "")
  {
    [delegate enableOrDisableStartButton:NO];
  }
  else
  {
    [delegate enableOrDisableStartButton:YES];
  }
}

-(void)changeLinkAction{
  [delegate enableOrDisableStartButton:NO];
   [self removeFromSuperview];
}

@end
