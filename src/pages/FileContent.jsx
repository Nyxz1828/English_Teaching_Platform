import React, { useState, useEffect, useRef } from "react";
import theme from "../styles/theme";
import { useToastContext } from "../contexts/ToastContext";
import ConfirmDialog from "../components/ConfirmDialog";
import Tooltip from "../components/Tooltip";
import LoadingSpinner from "../components/LoadingSpinner";

function FileContent() {
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const fileInputRef = useRef(null);
  const toast = useToastContext();

  useEffect(() => {
    const exampleContent = `# 檔案內容範例

這是一個檔案內容顯示頁面。

您可以在這裡：
- 查看檔案內容
- 編輯檔案（如果需要的話）
- 下載檔案

## 功能說明

這個頁面可以用來顯示各種類型的檔案內容，包括：
- 文字檔案 (.txt, .md)
- 程式碼檔案 (.js, .jsx, .py, .java)
- 其他格式的檔案

## 使用方式

1. 選擇要查看的檔案
2. 檔案內容會顯示在此頁面
3. 可以進行編輯或下載操作`;

    setFileContent(exampleContent);
    setFileName("example.md");
    setFileType("markdown");
    setEditedContent(exampleContent);
  }, []);

  useEffect(() => {
    setEditedContent(fileContent);
  }, [fileContent]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 檢查檔案大小（限制 5MB）
      if (file.size > 5 * 1024 * 1024) {
        toast.error("檔案大小不能超過 5MB");
        return;
      }

      setIsLoading(true);
      setFileName(file.name);
      setFileType(file.type || file.name.split('.').pop());
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
        setEditedContent(e.target.result);
        setIsLoading(false);
        toast.success(`成功載入檔案：${file.name}`);
      };
      reader.onerror = () => {
        setIsLoading(false);
        toast.error("讀取檔案時發生錯誤");
      };
      reader.readAsText(file);
    }
  };

  const handleDownload = () => {
    try {
      const contentToDownload = isEditing ? editedContent : fileContent;
      const blob = new Blob([contentToDownload], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'file.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("檔案下載成功！");
    } catch (error) {
      toast.error("下載檔案時發生錯誤");
    }
  };

  const handleClear = () => {
    setFileContent("");
    setFileName("");
    setFileType("");
    setEditedContent("");
    setIsEditing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("已清除檔案內容");
    setShowClearDialog(false);
  };

  const handleSave = () => {
    setFileContent(editedContent);
    setIsEditing(false);
    toast.success("檔案已儲存！");
  };

  const handleCancelEdit = () => {
    setEditedContent(fileContent);
    setIsEditing(false);
    toast.info("已取消編輯");
  };

  const handleCopy = () => {
    const contentToCopy = isEditing ? editedContent : fileContent;
    navigator.clipboard.writeText(contentToCopy).then(() => {
      toast.success("內容已複製到剪貼簿");
    }).catch(() => {
      toast.error("複製失敗");
    });
  };

  const getFileTypeColor = (type) => {
    const typeMap = {
      md: theme.colors.primary.main,
      js: theme.colors.warning.main,
      jsx: theme.colors.warning.main,
      py: theme.colors.secondary.main,
      java: theme.colors.error.main,
      txt: theme.colors.neutral.gray600,
    };
    return typeMap[type.toLowerCase()] || theme.colors.neutral.gray600;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>檔案內容</h1>
          <p style={styles.subtitle}>查看和管理您的檔案</p>
        </div>
        <div style={styles.actions}>
          <Tooltip text="上傳新檔案（支援 .txt, .md, .js, .jsx, .py, .java 等格式）">
            <label style={styles.uploadButton} className="hover-lift">
              <span style={styles.buttonIcon}>📁</span>
              上傳檔案
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                style={styles.fileInput}
                accept=".txt,.md,.js,.jsx,.py,.java,.json,.xml,.html,.css"
              />
            </label>
          </Tooltip>
          
          {fileContent && (
            <>
              {!isEditing ? (
                <>
                  <Tooltip text="編輯檔案內容">
                    <button
                      onClick={() => setIsEditing(true)}
                      style={styles.editButton}
                      className="hover-lift"
                    >
                      <span style={styles.buttonIcon}>✏️</span>
                      編輯
                    </button>
                  </Tooltip>
                  <Tooltip text="複製檔案內容到剪貼簿">
                    <button onClick={handleCopy} style={styles.copyButton} className="hover-lift">
                      <span style={styles.buttonIcon}>📋</span>
                      複製
                    </button>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Tooltip text="儲存變更">
                    <button onClick={handleSave} style={styles.saveButton} className="hover-lift">
                      <span style={styles.buttonIcon}>💾</span>
                      儲存
                    </button>
                  </Tooltip>
                  <Tooltip text="取消編輯">
                    <button onClick={handleCancelEdit} style={styles.cancelButton} className="hover-lift">
                      <span style={styles.buttonIcon}>❌</span>
                      取消
                    </button>
                  </Tooltip>
                </>
              )}
              
              <Tooltip text="下載檔案">
                <button onClick={handleDownload} style={styles.downloadButton} className="hover-lift">
                  <span style={styles.buttonIcon}>⬇️</span>
                  下載
                </button>
              </Tooltip>
              
              <Tooltip text="清除檔案內容">
                <button
                  onClick={() => setShowClearDialog(true)}
                  style={styles.clearButton}
                  className="hover-lift"
                >
                  <span style={styles.buttonIcon}>🗑️</span>
                  清除
                </button>
              </Tooltip>
            </>
          )}
        </div>
      </div>

      {fileName && (
        <div style={styles.fileInfo}>
          <div style={styles.fileInfoItem}>
            <span style={styles.fileInfoLabel}>檔案名稱：</span>
            <span style={styles.fileInfoValue}>{fileName}</span>
          </div>
          <div style={styles.fileInfoItem}>
            <span style={styles.fileInfoLabel}>類型：</span>
            <span
              style={{
                ...styles.fileTypeBadge,
                backgroundColor: `${getFileTypeColor(fileType)}15`,
                color: getFileTypeColor(fileType),
              }}
            >
              {fileType}
            </span>
          </div>
          {fileContent && (
            <div style={styles.fileInfoItem}>
              <span style={styles.fileInfoLabel}>大小：</span>
              <span style={styles.fileInfoValue}>
                {formatFileSize(new Blob([fileContent]).size)}
              </span>
            </div>
          )}
        </div>
      )}

      <div style={styles.contentContainer}>
        {isLoading ? (
          <div style={styles.loadingState}>
            <LoadingSpinner size="lg" text="載入檔案中..." />
          </div>
        ) : isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            style={styles.textarea}
            placeholder="在此編輯檔案內容..."
          />
        ) : fileContent ? (
          <pre style={styles.content}>{fileContent}</pre>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📄</div>
            <p style={styles.emptyText}>目前沒有載入任何檔案</p>
            <p style={styles.emptyHint}>請上傳檔案或選擇要查看的檔案</p>
            <Tooltip text="點擊上傳檔案按鈕開始">
              <button
                onClick={() => fileInputRef.current?.click()}
                style={styles.uploadPromptButton}
                className="hover-lift"
              >
                立即上傳檔案
              </button>
            </Tooltip>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={showClearDialog}
        title="確認清除"
        message="您確定要清除目前的檔案內容嗎？此操作無法復原。"
        onConfirm={handleClear}
        onCancel={() => setShowClearDialog(false)}
        confirmText="清除"
        cancelText="取消"
      />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: theme.colors.background.default,
    padding: theme.spacing.lg,
    animation: "fadeIn 0.5s ease-out",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.background.paper,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    boxShadow: theme.shadows.md,
    flexWrap: "wrap",
    gap: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize["3xl"],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    margin: 0,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    margin: 0,
  },
  actions: {
    display: "flex",
    gap: theme.spacing.md,
    flexWrap: "wrap",
  },
  uploadButton: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.sm,
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    backgroundColor: theme.colors.primary.main,
    color: theme.colors.text.inverse,
    border: "none",
    borderRadius: theme.borderRadius.lg,
    cursor: "pointer",
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    transition: "all 0.3s ease",
    boxShadow: theme.shadows.md,
  },
  editButton: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.sm,
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    backgroundColor: theme.colors.secondary.main,
    color: theme.colors.text.inverse,
    border: "none",
    borderRadius: theme.borderRadius.lg,
    cursor: "pointer",
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    transition: "all 0.3s ease",
    boxShadow: theme.shadows.md,
  },
  saveButton: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.sm,
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    backgroundColor: theme.colors.success.main,
    color: theme.colors.text.inverse,
    border: "none",
    borderRadius: theme.borderRadius.lg,
    cursor: "pointer",
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    transition: "all 0.3s ease",
    boxShadow: theme.shadows.md,
  },
  cancelButton: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.sm,
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    backgroundColor: theme.colors.neutral.gray400,
    color: theme.colors.text.inverse,
    border: "none",
    borderRadius: theme.borderRadius.lg,
    cursor: "pointer",
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    transition: "all 0.3s ease",
    boxShadow: theme.shadows.md,
  },
  copyButton: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.sm,
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    backgroundColor: theme.colors.warning.main,
    color: theme.colors.text.inverse,
    border: "none",
    borderRadius: theme.borderRadius.lg,
    cursor: "pointer",
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    transition: "all 0.3s ease",
    boxShadow: theme.shadows.md,
  },
  downloadButton: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.sm,
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    backgroundColor: theme.colors.success.main,
    color: theme.colors.text.inverse,
    border: "none",
    borderRadius: theme.borderRadius.lg,
    cursor: "pointer",
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    transition: "all 0.3s ease",
    boxShadow: theme.shadows.md,
  },
  clearButton: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.sm,
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    backgroundColor: theme.colors.error.main,
    color: theme.colors.text.inverse,
    border: "none",
    borderRadius: theme.borderRadius.lg,
    cursor: "pointer",
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    transition: "all 0.3s ease",
    boxShadow: theme.shadows.md,
  },
  buttonIcon: {
    fontSize: theme.typography.fontSize.lg,
  },
  fileInput: {
    display: "none",
  },
  fileInfo: {
    display: "flex",
    gap: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.xl,
    boxShadow: theme.shadows.md,
    flexWrap: "wrap",
  },
  fileInfoItem: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  fileInfoLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  fileInfoValue: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  fileTypeBadge: {
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  contentContainer: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.xl,
    boxShadow: theme.shadows.md,
    padding: theme.spacing.xl,
    minHeight: "400px",
    position: "relative",
  },
  content: {
    fontFamily: theme.typography.fontFamily.mono,
    fontSize: theme.typography.fontSize.base,
    lineHeight: theme.typography.lineHeight.relaxed,
    color: theme.colors.text.primary,
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    margin: 0,
    backgroundColor: theme.colors.neutral.gray50,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.colors.neutral.gray200}`,
  },
  textarea: {
    fontFamily: theme.typography.fontFamily.mono,
    fontSize: theme.typography.fontSize.base,
    lineHeight: theme.typography.lineHeight.relaxed,
    color: theme.colors.text.primary,
    width: "100%",
    minHeight: "400px",
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    border: `2px solid ${theme.colors.primary.main}`,
    backgroundColor: theme.colors.background.paper,
    resize: "vertical",
    outline: "none",
  },
  emptyState: {
    textAlign: "center",
    padding: `${theme.spacing["3xl"]} ${theme.spacing.lg}`,
    color: theme.colors.text.secondary,
  },
  emptyIcon: {
    fontSize: "64px",
    marginBottom: theme.spacing.md,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  emptyHint: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
  },
  uploadPromptButton: {
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    backgroundColor: theme.colors.primary.main,
    color: theme.colors.text.inverse,
    border: "none",
    borderRadius: theme.borderRadius.lg,
    cursor: "pointer",
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    transition: "all 0.3s ease",
    boxShadow: theme.shadows.md,
  },
  loadingState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing["3xl"],
    color: theme.colors.text.secondary,
  },
};

export default FileContent;
