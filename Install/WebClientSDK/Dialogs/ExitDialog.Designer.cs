using WixSharp;
using WixSharp.UI.Forms;

namespace WixSharpSetup.Dialogs
{
    partial class ExitDialog
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
            this.imgPanel = new System.Windows.Forms.Panel();
            this.textPanel = new System.Windows.Forms.Panel();
            this.title = new System.Windows.Forms.Label();
            this.description = new System.Windows.Forms.Label();
            this.image = new System.Windows.Forms.PictureBox();
            this.bottomPanel = new System.Windows.Forms.Panel();
            this.viewLog = new System.Windows.Forms.LinkLabel();
            this.tableLayoutPanel = new System.Windows.Forms.TableLayoutPanel();
            this.back = new System.Windows.Forms.Button();
            this.next = new System.Windows.Forms.Button();
            this.cancel = new System.Windows.Forms.Button();
            this.border = new System.Windows.Forms.Panel();
            this.checkBoxOpenInstallDir = new System.Windows.Forms.CheckBox();
            this.imgPanel.SuspendLayout();
            this.textPanel.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.image)).BeginInit();
            this.bottomPanel.SuspendLayout();
            this.tableLayoutPanel.SuspendLayout();
            this.SuspendLayout();
            //
            // imgPanel
            //
            this.imgPanel.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom)
            | System.Windows.Forms.AnchorStyles.Left)
            | System.Windows.Forms.AnchorStyles.Right)));
            this.imgPanel.Controls.Add(this.textPanel);
            this.imgPanel.Controls.Add(this.image);
            this.imgPanel.Location = new System.Drawing.Point(0, 0);
            this.imgPanel.Name = "imgPanel";
            this.imgPanel.Size = new System.Drawing.Size(494, 312);
            this.imgPanel.TabIndex = 8;
            //
            // textPanel
            //
            this.textPanel.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom)
            | System.Windows.Forms.AnchorStyles.Left)
            | System.Windows.Forms.AnchorStyles.Right)));
            this.textPanel.Controls.Add(this.checkBoxOpenInstallDir);
            this.textPanel.Controls.Add(this.title);
            this.textPanel.Controls.Add(this.description);
            this.textPanel.Location = new System.Drawing.Point(162, 12);
            this.textPanel.Name = "textPanel";
            this.textPanel.Size = new System.Drawing.Size(326, 294);
            this.textPanel.TabIndex = 8;
            //
            // title
            //
            this.title.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left)
            | System.Windows.Forms.AnchorStyles.Right)));
            this.title.BackColor = System.Drawing.Color.Transparent;
            this.title.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.title.Location = new System.Drawing.Point(3, 0);
            this.title.Name = "title";
            this.title.Size = new System.Drawing.Size(320, 61);
            this.title.TabIndex = 6;
            this.title.Text = "[ExitDialogTitle]";
            //
            // description
            //
            this.description.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom)
            | System.Windows.Forms.AnchorStyles.Left)
            | System.Windows.Forms.AnchorStyles.Right)));
            this.description.BackColor = System.Drawing.Color.Transparent;
            this.description.Location = new System.Drawing.Point(4, 75);
            this.description.Name = "description";
            this.description.Size = new System.Drawing.Size(318, 215);
            this.description.TabIndex = 7;
            this.description.Text = "[ExitDialogDescription]";
            //
            // image
            //
            this.image.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom)
            | System.Windows.Forms.AnchorStyles.Left)));
            this.image.BackColor = System.Drawing.Color.White;
            this.image.Location = new System.Drawing.Point(0, 0);
            this.image.Name = "image";
            this.image.Size = new System.Drawing.Size(156, 312);
            this.image.TabIndex = 4;
            this.image.TabStop = false;
            //
            // bottomPanel
            //
            this.bottomPanel.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)
            | System.Windows.Forms.AnchorStyles.Right)));
            this.bottomPanel.BackColor = System.Drawing.SystemColors.Control;
            this.bottomPanel.Controls.Add(this.viewLog);
            this.bottomPanel.Controls.Add(this.tableLayoutPanel);
            this.bottomPanel.Controls.Add(this.border);
            this.bottomPanel.Location = new System.Drawing.Point(0, 312);
            this.bottomPanel.Name = "bottomPanel";
            this.bottomPanel.Size = new System.Drawing.Size(494, 49);
            this.bottomPanel.TabIndex = 5;
            //
            // viewLog
            //
            this.viewLog.Anchor = System.Windows.Forms.AnchorStyles.Left;
            this.viewLog.AutoSize = true;
            this.viewLog.BackColor = System.Drawing.Color.Transparent;
            this.viewLog.Location = new System.Drawing.Point(16, 17);
            this.viewLog.Name = "viewLog";
            this.viewLog.Size = new System.Drawing.Size(54, 13);
            this.viewLog.TabIndex = 1;
            this.viewLog.TabStop = true;
            this.viewLog.Text = "[ViewLog]";
            this.viewLog.LinkClicked += new System.Windows.Forms.LinkLabelLinkClickedEventHandler(this.viewLog_LinkClicked);
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
            this.tableLayoutPanel.TabIndex = 7;
            //
            // back
            //
            this.back.Anchor = System.Windows.Forms.AnchorStyles.Right;
            this.back.AutoSize = true;
            this.back.Enabled = false;
            this.back.Location = new System.Drawing.Point(204, 10);
            this.back.MinimumSize = new System.Drawing.Size(75, 0);
            this.back.Name = "back";
            this.back.Size = new System.Drawing.Size(86, 23);
            this.back.TabIndex = 0;
            this.back.Text = "[WixUIBack]";
            this.back.UseVisualStyleBackColor = true;
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
            this.next.Text = "[WixUIFinish]";
            this.next.UseVisualStyleBackColor = true;
            this.next.Click += new System.EventHandler(this.finish_Click);
            //
            // cancel
            //
            this.cancel.Anchor = System.Windows.Forms.AnchorStyles.Right;
            this.cancel.AutoSize = true;
            this.cancel.Enabled = false;
            this.cancel.Location = new System.Drawing.Point(402, 10);
            this.cancel.MinimumSize = new System.Drawing.Size(75, 0);
            this.cancel.Name = "cancel";
            this.cancel.Size = new System.Drawing.Size(86, 23);
            this.cancel.TabIndex = 0;
            this.cancel.Text = "[WixUICancel]";
            this.cancel.UseVisualStyleBackColor = true;
            //
            // border
            //
            this.border.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left)
            | System.Windows.Forms.AnchorStyles.Right)));
            this.border.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.border.Location = new System.Drawing.Point(0, 0);
            this.border.Name = "border";
            this.border.Size = new System.Drawing.Size(494, 1);
            this.border.TabIndex = 9;
            //
            // checkBoxOpenInstallDir
            //
            this.checkBoxOpenInstallDir.AutoSize = true;
            this.checkBoxOpenInstallDir.Enabled = false;
            this.checkBoxOpenInstallDir.Location = new System.Drawing.Point(7, 272);
            this.checkBoxOpenInstallDir.Name = "checkBoxOpenInstallDir";
            this.checkBoxOpenInstallDir.Size = new System.Drawing.Size(147, 17);
            this.checkBoxOpenInstallDir.TabIndex = 8;
            this.checkBoxOpenInstallDir.Text = "[OpenInstallDirCheckBox]";
            this.checkBoxOpenInstallDir.UseVisualStyleBackColor = true;
            //
            // ExitDialog
            //
            this.BackColor = System.Drawing.SystemColors.Control;
            this.ClientSize = new System.Drawing.Size(494, 361);
            this.Controls.Add(this.imgPanel);
            this.Controls.Add(this.bottomPanel);
            this.Name = "ExitDialog";
            this.Text = "[ExitDialog_Title]";
            this.Load += new System.EventHandler(this.ExitDialog_Load);
            this.imgPanel.ResumeLayout(false);
            this.textPanel.ResumeLayout(false);
            this.textPanel.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.image)).EndInit();
            this.bottomPanel.ResumeLayout(false);
            this.bottomPanel.PerformLayout();
            this.tableLayoutPanel.ResumeLayout(false);
            this.tableLayoutPanel.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Label description;
        private System.Windows.Forms.Label title;
        private System.Windows.Forms.Panel bottomPanel;
        private System.Windows.Forms.PictureBox image;
        private System.Windows.Forms.LinkLabel viewLog;
        private System.Windows.Forms.Panel imgPanel;
        private System.Windows.Forms.Panel border;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel;
        private System.Windows.Forms.Button back;
        private System.Windows.Forms.Button next;
        private System.Windows.Forms.Button cancel;
        private System.Windows.Forms.Panel textPanel;
        private System.Windows.Forms.CheckBox checkBoxOpenInstallDir;
    }
}