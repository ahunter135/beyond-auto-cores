global using System;
global using System.Collections.Generic;
global using System.Linq;
global using System.Text;
global using System.Text.Json;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.AspNetCore.Authorization;
global using Sentry;
global using Hangfire;

global using Onsharp.BeyondAutoCore.Domain.Dto;
global using Onsharp.BeyondAutoCore.Domain.Enums;
global using Onsharp.BeyondAutoCore.Domain.Command;
global using Onsharp.BeyondAutoCore.Domain.Model;
global using Onsharp.BeyondAutoCore.Domain.Helpers;
global using Onsharp.BeyondAutoCore.Application;