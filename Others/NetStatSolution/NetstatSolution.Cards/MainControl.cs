using System;
using System.Runtime.InteropServices;
using DocsVision.BackOffice.WinForms;

namespace NetstatSolution.Cards;

[ComVisible(true)]
[Customizable(true)]
[Guid("053B0CA1-95FD-4DDA-95FA-6043AFACCC1F")]
[ClassInterface(ClassInterfaceType.None)]
public partial class MainControl : BaseCardControl
{
    public MainControl()
    {
        InitializeComponent();
    }
}
