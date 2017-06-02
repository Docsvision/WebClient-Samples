declare namespace WebClient {
    class DateTimeFormat {
        Date: string;
        Time: string;
        readonly DateTime: string;
    }
}
declare namespace WebClient {
    /**
    * Определяет возможные типы клиентских устройств.
    */
    enum DeviceType {
        /** Персональный компьютер. */
        Desktop = 0,
        /** Телефон. */
        Smartphone = 1,
        /** Планшет. */
        Tablet = 2,
    }
}
declare namespace WebClient {
    enum ErrorNotificationType {
        Success = 0,
        Warning = 1,
        Error = 2,
    }
}
declare namespace WebClient {
    interface IAgreementParams {
        agreementTemplateId: string;
        approvalKind: string;
        stages: IAgreementStage[];
    }
}
declare namespace WebClient {
    interface IAgreementStage {
        stageId: string;
        fieldId: string;
        participants: string[];
    }
}
declare namespace WebClient {
    interface IEmployeeItemData {
        Id: string;
        FullName: string;
        FirstName: string;
        MiddleName: string;
        LastName: string;
        IsMyself: boolean;
        Position: string;
    }
}
declare namespace WebClient {
    interface IFileSignInfo {
        fileId: string;
        versionId: string;
        fileCardId: string;
    }
}
declare namespace WebClient {
    /** @internal */
    class ModalWindow {
    }
}
declare namespace WebClient {
    /** @internal */
    class RightSidebar {
    }
}
declare namespace WebClient {
    /** @internal */
    class FileSign {
    }
}