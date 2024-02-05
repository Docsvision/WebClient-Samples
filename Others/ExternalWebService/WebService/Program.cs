using DocsVision.Platform.ObjectManager.Rest.Extensions;
using WebService.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSingleton<IDocumentService, DocumentService>();
builder.Services.AddSingleton<IReportService, ReportService>();
builder.Services.AddSingleton<ISessionService, SessionService>();


var app = builder.Build();

app.UseRouting();
app.MapDefaultControllerRoute();
app.SetupSystemUserContext();

app.Run();
