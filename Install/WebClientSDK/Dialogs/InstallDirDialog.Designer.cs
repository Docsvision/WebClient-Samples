using WixSharp;
using WixSharp.UI.Forms;

namespace WixSharpSetup.Dialogs
{
    partial class InstallDirDialog
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.middlePanel = new System.Windows.Forms.Panel();
            this.change = new System.Windows.Forms.Button();
            this.label = new System.Windows.Forms.Label();
            this.installDir = new System.Windows.Forms.TextBox();
            this.topBorder = new System.Windows.Forms.Panel();
            this.topPanel = new System.Windows.Forms.Panel();
            this.banner = new System.Windows.Forms.PictureBox();
            this.bottomPanel = new System.Windows.Forms.Panel();
            this.tableLayoutPanel = new System.Windows.Forms.TableLayoutPanel();
            this.back = new System.Windows.Forms.Button();
            this.next = new System.Windows.Forms.Button();
            this.cancel = new System.Windows.Forms.Button();
            this.border = new System.Windows.Forms.Panel();
            this.checkBoxOverride = new System.Windows.Forms.CheckBox();
            this.labelOverride = new System.Windows.Forms.Label();
            this.groupBoxOverride = new System.Windows.Forms.GroupBox();
            this.middlePanel.SuspendLayout();
            this.topPanel.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.banner)).BeginInit();
            this.bottomPanel.SuspendLayout();
            this.tableLayoutPanel.SuspendLayout();
            this.groupBoxOverride.SuspendLayout();
            this.SuspendLayout();
            //
            // middlePanel
            //
            this.middlePanel.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom)
            | System.Windows.Forms.AnchorStyles.Left)
            | System.Windows.Forms.AnchorStyles.Right)));
            this.middlePanel.Controls.Add(this.change);
            this.middlePanel.Controls.Add(this.label);
            this.middlePanel.Controls.Add(this.installDir);
            this.middlePanel.Location = new System.Drawing.Point(22, 75);
            this.middlePanel.Name = "middlePanel";
            this.middlePanel.Size = new System.Drawing.Size(449, 119);
            this.middlePanel.TabIndex = 16;
            //
            // change
            //
            this.change.AutoSize = true;
            this.change.Location = new System.Drawing.Point(3, 88);
            this.change.Name = "change";
            this.change.Size = new System.Drawing.Size(119, 23);
            this.change.TabIndex = 12;
            this.change.Text = "[InstallDirDlgChange]";
            this.change.UseVisualStyleBackColor = true;
            this.change.Click += new System.EventHandler(this.change_Click);
            //
            // label
            //
            this.label.AutoSize = true;
            this.label.BackColor = System.Drawing.Color.Transparent;
            this.label.Location = new System.Drawing.Point(0, 3);
            this.label.Name = "label";
            this.label.Size = new System.Drawing.Size(124, 13);
            this.label.TabIndex = 11;
            this.label.Text = "[InstallDirDlgFolderLabel]";
            //
            // installDir
            //
            this.installDir.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left)
            | System.Windows.Forms.AnchorStyles.Right)));
            this.installDir.Location = new System.Drawing.Point(3, 56);
            this.installDir.Name = "installDir";
            this.installDir.Size = new System.Drawing.Size(443, 20);
            this.installDir.TabIndex = 13;
            //
            // topBorder
            //
            this.topBorder.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left)
            | System.Windows.Forms.AnchorStyles.Right)));
            this.topBorder.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.topBorder.Location = new System.Drawing.Point(0, 58);
            this.topBorder.Name = "topBorder";
            this.topBorder.Size = new System.Drawing.Size(494, 1);
            this.topBorder.TabIndex = 15;
            //
            // topPanel
            //
            this.topPanel.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left)
            | System.Windows.Forms.AnchorStyles.Right)));
            this.topPanel.BackColor = System.Drawing.SystemColors.Control;
            this.topPanel.Controls.Add(this.banner);
            this.topPanel.Location = new System.Drawing.Point(0, 0);
            this.topPanel.Name = "topPanel";
            this.topPanel.Size = new System.Drawing.Size(494, 58);
            this.topPanel.TabIndex = 10;
            //
            // banner
            //
            this.banner.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom)
            | System.Windows.Forms.AnchorStyles.Left)
            | System.Windows.Forms.AnchorStyles.Right)));
            this.banner.BackColor = System.Drawing.Color.White;
            this.banner.Location = new System.Drawing.Point(0, 0);
            this.banner.Name = "banner";
            this.banner.Size = new System.Drawing.Size(494, 58);
            this.banner.TabIndex = 0;
            this.banner.TabStop = false;
            //
            // bottomPanel
            //
            this.bottomPanel.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)
            | System.Windows.Forms.AnchorStyles.Right)));
            this.bottomPanel.BackColor = System.Drawing.SystemColors.Control;
            this.bottomPanel.Controls.Add(this.tableLayoutPanel);
            this.bottomPanel.Controls.Add(this.border);
            this.bottomPanel.Location = new System.Drawing.Point(0, 312);
            this.bottomPanel.Name = "bottomPanel";
            this.bottomPanel.Size = new System.Drawing.Size(494, 49);
            this.bottomPanel.TabIndex = 9;
            //
            // tableLayoutPanel
            //
            this.tableLayoutPanel.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Left | System.Windows.Forms.AnchorStyles.Right)));
            this.tableLayoutPanel.ColumnCount = 5;
            this.tableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.tableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.tableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 14F));
            this.tableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.tableLayoutPanel.Controls.Add(this.back, 1, 0);
            this.tableLayoutPanel.Controls.Add(this.next, 2, 0);
            this.tableLayoutPanel.Controls.Add(this.cancel, 4, 0);
            this.tableLayoutPanel.Location = new System.Drawing.Point(0, 3);
            this.tableLayoutPanel.Name = "tableLayoutPanel";
            this.tableLayoutPanel.RowCount = 1;
            this.tableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel.Size = new System.Drawing.Size(491, 43);
            this.tableLayoutPanel.TabIndex = 8;
            //
            // back
            //
            this.back.Anchor = System.Windows.Forms.AnchorStyles.Right;
            this.back.AutoSize = true;
            this.back.Location = new System.Drawing.Point(204, 10);
            this.back.MinimumSize = new System.Drawing.Size(75, 0);
            this.back.Name = "back";
            this.back.Size = new System.Drawing.Size(86, 23);
            this.back.TabIndex = 0;
            this.back.Text = "[WixUIBack]";
            this.back.UseVisualStyleBackColor = true;
            this.back.Click += new System.EventHandler(this.back_Click);
            //
            // next
            //
            this.next.Anchor = System.Windows.Forms.AnchorStyles.Right;
            this.next.AutoSize = true;
            this.next.Location = new System.Drawing.Point(296, 10);
            this.next.MinimumSize = new System.Drawing.Size(75, 0);
            this.next.Name = "next";
            this.next.Size = new System.Drawing.Size(86, 23);
            this.next.TabIndex = 0;
            this.next.Text = "[WixUINext]";
            this.next.UseVisualStyleBackColor = true;
            this.next.Click += new System.EventHandler(this.next_Click);
            //
            // cancel
            //
            this.cancel.Anchor = System.Windows.Forms.AnchorStyles.Right;
            this.cancel.AutoSize = true;
            this.cancel.Location = new System.Drawing.Point(402, 10);
            this.cancel.MinimumSize = new System.Drawing.Size(75, 0);
            this.cancel.Name = "cancel";
            this.cancel.Size = new System.Drawing.Size(86, 23);
            this.cancel.TabIndex = 0;
            this.cancel.Text = "[WixUICancel]";
            this.cancel.UseVisualStyleBackColor = true;
            this.cancel.Click += new System.EventHandler(this.cancel_Click);
            //
            // border
            //
            this.border.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.border.Dock = System.Windows.Forms.DockStyle.Top;
            this.border.Location = new System.Drawing.Point(0, 0);
            this.border.Name = "border";
            this.border.Size = new System.Drawing.Size(494, 1);
            this.border.TabIndex = 14;
            //
            // checkBoxOverride
            //
            this.checkBoxOverride.AutoSize = true;
            this.checkBoxOverride.Location = new System.Drawing.Point(6, 19);
            this.checkBoxOverride.Name = "checkBoxOverride";
            this.checkBoxOverride.Size = new System.Drawing.Size(153, 17);
            this.checkBoxOverride.TabIndex = 17;
            this.checkBoxOverride.Text = "[OverrideOutputCheckBox]";
            this.checkBoxOverride.UseVisualStyleBackColor = true;
            this.checkBoxOverride.CheckedChanged += new System.EventHandler(this.checkBoxOverride_CheckedChanged);
            //
            // labelOverride
            //
            this.labelOverride.AutoEllipsis = true;
            this.labelOverride.BackColor = System.Drawing.Color.Transparent;
            this.labelOverride.Location = new System.Drawing.Point(6, 39);
            this.labelOverride.Name = "labelOverride";
            this.labelOverride.Size = new System.Drawing.Size(437, 47);
            this.labelOverride.TabIndex = 18;
            this.labelOverride.Text = "[OverrideOutputDescription]";
            //
            // groupBoxOverride
            //
            this.groupBoxOverride.Controls.Add(this.checkBoxOverride);
            this.groupBoxOverride.Controls.Add(this.labelOverride);
            this.groupBoxOverride.Enabled = false;
            this.groupBoxOverride.Location = new System.Drawing.Point(22, 200);
            this.groupBoxOverride.Name = "groupBoxOverride";
            this.groupBoxOverride.Size = new System.Drawing.Size(449, 89);
            this.groupBoxOverride.TabIndex = 19;
            this.groupBoxOverride.TabStop = false;
            this.groupBoxOverride.Text = "[OverrideOutputGroupBoxTitle]";
            //
            // InstallDirDialog
            //
            this.ClientSize = new System.Drawing.Size(494, 361);
            this.Controls.Add(this.groupBoxOverride);
            this.Controls.Add(this.middlePanel);
            this.Controls.Add(this.topBorder);
            this.Controls.Add(this.topPanel);
            this.Controls.Add(this.bottomPanel);
            this.Name = "InstallDirDialog";
            this.Text = "[InstallDirDlg_Title]";
            this.Load += new System.EventHandler(this.InstallDirDialog_Load);
            this.middlePanel.ResumeLayout(false);
            this.middlePanel.PerformLayout();
            this.topPanel.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.banner)).EndInit();
            this.bottomPanel.ResumeLayout(false);
            this.tableLayoutPanel.ResumeLayout(false);
            this.tableLayoutPanel.PerformLayout();
            this.groupBoxOverride.ResumeLayout(false);
            this.groupBoxOverride.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.PictureBox banner;
        private System.Windows.Forms.Panel topPanel;
        private System.Windows.Forms.Panel bottomPanel;
        private System.Windows.Forms.Label label;
        private System.Windows.Forms.Button change;
        private System.Windows.Forms.TextBox installDir;
        private System.Windows.Forms.Panel border;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel;
        private System.Windows.Forms.Button back;
        private System.Windows.Forms.Button next;
        private System.Windows.Forms.Button cancel;
        private System.Windows.Forms.Panel topBorder;
        private System.Windows.Forms.Panel middlePanel;
        private System.Windows.Forms.CheckBox checkBoxOverride;
        private System.Windows.Forms.Label labelOverride;
        private System.Windows.Forms.GroupBox groupBoxOverride;
    }
}