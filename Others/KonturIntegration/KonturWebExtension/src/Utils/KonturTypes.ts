// Данный файл сгенерирован на основе схем данных API Контур.Фокус.


export interface OrganizationInfo {
    /**
     * Экспресс-отчет по контрагенту
     */
    briefReport?: BriefReport;
    /**
     * Контактные телефоны из Контур.Справочника (для получения контактов требуется отдельная
     * подписка и вызов отдельного метода)
     */
    contactPhones?: ContactPhones;
    /**
     * Ссылка на карточку юридического лица (ИП) в Контур.Фокусе (для работы требуется подписка
     * на Контур.Фокус и дополнительная авторизация)
     */
    focusHref?: string;
    /**
     * ИНН(ИП)
     */
    inn?: string;
    /**
     * Информация об индивидуальном предпринимателе
     */
    IP?: IP;
    /**
     * ОГРН(ИП)
     */
    ogrn?: string;
    /**
     * Информация о юридическом лице
     */
    UL?: UL;
}

/**
 * Информация об индивидуальном предпринимателе
 */
export interface IP {
    /**
     * Дата прекращения деятельности
     */
    dissolutionDate?: string;
    /**
     * ФИО
     */
    fio?: string;
    /**
     * ОКАТО
     */
    okato?: string;
    /**
     * ОКФС
     */
    okfs?: string;
    /**
     * ОКОГУ
     */
    okogu?: string;
    /**
     * Код ОКОПФ
     */
    okopf?: string;
    /**
     * ОКПО
     */
    okpo?: string;
    /**
     * ОКТМО
     */
    oktmo?: string;
    /**
     * Наименование организационно-правовой формы
     */
    opf?: string;
    /**
     * Дата образования
     */
    registrationDate?: string;
    /**
     * Статус ИП
     */
    status?: any[] | boolean | number | number | null | PurpleStatus | string;
}

export interface PurpleStatus {
    /**
     * Дата
     */
    date?: string;
    /**
     * Недействующий
     */
    dissolved?: boolean;
    /**
     * Неформализованное описание статуса
     */
    statusString?: string;
}

/**
 * Информация о юридическом лице
 */
export interface UL {
    /**
     * Филиалы и представительства
     */
    branches?: Branch[];
    /**
     * Дата прекращения деятельности в результате ликвидации, реорганизации или других событий
     */
    dissolutionDate?: string;
    /**
     * Лица, имеющие право подписи без доверенности (руководители)
     */
    heads?:   Head[];
    history?: History;
    /**
     * КПП
     */
    kpp?: string;
    /**
     * Юридический адрес
     */
    legalAddress?: ULLegalAddress;
    /**
     * Наименование юридического лица
     */
    legalName?: ULLegalName;
    /**
     * Управляющие компании
     */
    managementCompanies?: ManagementCompany[];
    /**
     * Код ОКАТО
     */
    okato?: string;
    /**
     * Код ОКФС
     */
    okfs?: string;
    /**
     * Код ОКОГУ
     */
    okogu?: string;
    /**
     * Код ОКОПФ
     */
    okopf?: string;
    /**
     * Код ОКПО
     */
    okpo?: string;
    /**
     * Код ОКТМО
     */
    oktmo?: string;
    /**
     * Наименование организационно-правовой формы
     */
    opf?: string;
    /**
     * Дата образования
     */
    registrationDate?: string;
    /**
     * Статус организации
     */
    status?: any[] | boolean | number | number | null | FluffyStatus | string;
}

export interface Branch {
    /**
     * Дата
     */
    date?: string;
    /**
     * Адрес вне РФ
     */
    foreignAddress?: ForeignAddress;
    /**
     * Наименование филиала или представительства
     */
    name?: string;
    /**
     * Разобранный на составляющие адрес в РФ
     */
    parsedAddressRF?: BranchParsedAddressRF;
}

/**
 * Адрес вне РФ
 */
export interface ForeignAddress {
    /**
     * Строка, содержащая адрес
     */
    addressString?: string;
    /**
     * Наименование страны
     */
    countryName?: string;
}

/**
 * Разобранный на составляющие адрес в РФ
 */
export interface BranchParsedAddressRF {
    /**
     * Корпус
     */
    bulk?: Bulk;
    /**
     * Полное значение поля "Корпус" из ЕГРЮЛ
     */
    bulkRaw?: string;
    /**
     * Город
     */
    city?: City;
    /**
     * Район
     */
    district?: District;
    /**
     * Офис/квартира/комната
     */
    flat?: Flat;
    /**
     * Полное значение поля "Квартира" из ЕГРЮЛ
     */
    flatRaw?: string;
    /**
     * Дом
     */
    house?: House;
    /**
     * Полное значение поля "Дом" из ЕГРЮЛ
     */
    houseRaw?: string;
    /**
     * Код КЛАДР
     */
    kladrCode?: string;
    /**
     * Код региона
     */
    regionCode?: string;
    /**
     * Регион
     */
    regionName?: RegionName;
    /**
     * Населенный пункт
     */
    settlement?: Settlement;
    /**
     * Улица
     */
    street?: Street;
    /**
     * Индекс
     */
    zipCode?: string;
}

/**
 * Корпус
 */
export interface Bulk {
    /**
     * Полное наименование вида топонима
     */
    topoFullName?: string;
    /**
     * Краткое наименование вида топонима
     */
    topoShortName?: string;
    /**
     * Значение топонима
     */
    topoValue?: string;
}

/**
 * Город
 *
 * Корпус
 */
export interface City {
    /**
     * Полное наименование вида топонима
     */
    topoFullName?: string;
    /**
     * Краткое наименование вида топонима
     */
    topoShortName?: string;
    /**
     * Значение топонима
     */
    topoValue?: string;
}

/**
 * Район
 *
 * Корпус
 */
export interface District {
    /**
     * Полное наименование вида топонима
     */
    topoFullName?: string;
    /**
     * Краткое наименование вида топонима
     */
    topoShortName?: string;
    /**
     * Значение топонима
     */
    topoValue?: string;
}

/**
 * Офис/квартира/комната
 *
 * Корпус
 */
export interface Flat {
    /**
     * Полное наименование вида топонима
     */
    topoFullName?: string;
    /**
     * Краткое наименование вида топонима
     */
    topoShortName?: string;
    /**
     * Значение топонима
     */
    topoValue?: string;
}

/**
 * Дом
 *
 * Корпус
 */
export interface House {
    /**
     * Полное наименование вида топонима
     */
    topoFullName?: string;
    /**
     * Краткое наименование вида топонима
     */
    topoShortName?: string;
    /**
     * Значение топонима
     */
    topoValue?: string;
}

/**
 * Регион
 *
 * Корпус
 */
export interface RegionName {
    /**
     * Полное наименование вида топонима
     */
    topoFullName?: string;
    /**
     * Краткое наименование вида топонима
     */
    topoShortName?: string;
    /**
     * Значение топонима
     */
    topoValue?: string;
}

/**
 * Населенный пункт
 *
 * Корпус
 */
export interface Settlement {
    /**
     * Полное наименование вида топонима
     */
    topoFullName?: string;
    /**
     * Краткое наименование вида топонима
     */
    topoShortName?: string;
    /**
     * Значение топонима
     */
    topoValue?: string;
}

/**
 * Улица
 *
 * Корпус
 */
export interface Street {
    /**
     * Полное наименование вида топонима
     */
    topoFullName?: string;
    /**
     * Краткое наименование вида топонима
     */
    topoShortName?: string;
    /**
     * Значение топонима
     */
    topoValue?: string;
}

export interface Head {
    /**
     * Дата последнего внесения изменений
     */
    date?: string;
    /**
     * ФИО
     */
    fio?: string;
    /**
     * Дата первого внесения сведений
     */
    firstDate?: string;
    /**
     * ИННФЛ
     */
    innfl?: string;
    /**
     * Должность
     */
    position?: string;
}

export interface History {
    /**
     * Филиалы и представительства из истории
     */
    branches?: Branch[];
    /**
     * Лица, имеющие право подписи без доверенности (руководители) из истории
     */
    heads?: Head[];
    /**
     * КПП
     */
    kpps?: KppWithDate[];
    /**
     * Список юридических адресов из истории
     */
    legalAddresses?: LegalAddressElement[];
    /**
     * Наименование юридического лица
     */
    legalNames?: LegalNameElement[];
    /**
     * Управляющие компании
     */
    managementCompanies?: ManagementCompany[];
}

export interface KppWithDate {
    /**
     * Дата
     */
    date?: string;
    /**
     * КПП
     */
    kpp?: string;
}

export interface LegalAddressElement {
    /**
     * Дата
     */
    date?: string;
    /**
     * Дата первого внесения сведений
     */
    firstDate?: string;
    /**
     * Разобранный на составляющие адрес в РФ
     */
    parsedAddressRF?: LegalAddressParsedAddressRF;
}

/**
 * Разобранный на составляющие адрес в РФ
 */
export interface LegalAddressParsedAddressRF {
    /**
     * Корпус
     */
    bulk?: Bulk;
    /**
     * Полное значение поля "Корпус" из ЕГРЮЛ
     */
    bulkRaw?: string;
    /**
     * Город
     */
    city?: City;
    /**
     * Район
     */
    district?: District;
    /**
     * Офис/квартира/комната
     */
    flat?: Flat;
    /**
     * Полное значение поля "Квартира" из ЕГРЮЛ
     */
    flatRaw?: string;
    /**
     * Дом
     */
    house?: House;
    /**
     * Полное значение поля "Дом" из ЕГРЮЛ
     */
    houseRaw?: string;
    /**
     * Код КЛАДР
     */
    kladrCode?: string;
    /**
     * Код региона
     */
    regionCode?: string;
    /**
     * Регион
     */
    regionName?: RegionName;
    /**
     * Населенный пункт
     */
    settlement?: Settlement;
    /**
     * Улица
     */
    street?: Street;
    /**
     * Индекс
     */
    zipCode?: string;
}

export interface LegalNameElement {
    /**
     * Дата
     */
    date?: string;
    /**
     * Полное наименование организации
     */
    full?: string;
    /**
     * Краткое наименование организации
     */
    short?: string;
}

export interface ManagementCompany {
    /**
     * Дата последнего внесения изменений
     */
    date?: string;
    /**
     * Дата первого внесения сведений
     */
    firstDate?: string;
    /**
     * ИНН управляющей организации (если указан)
     */
    inn?: string;
    /**
     * Наименование управляющей организации
     */
    name?: string;
    /**
     * ОГРН управляющей организации (если указан)
     */
    ogrn?: string;
}

/**
 * Юридический адрес
 */
export interface ULLegalAddress {
    /**
     * Дата
     */
    date?: string;
    /**
     * Дата первого внесения сведений
     */
    firstDate?: string;
    /**
     * Разобранный на составляющие адрес в РФ
     */
    parsedAddressRF?: LegalAddressParsedAddressRF;
}

/**
 * Наименование юридического лица
 */
export interface ULLegalName {
    /**
     * Дата
     */
    date?: string;
    /**
     * Полное наименование организации
     */
    full?: string;
    /**
     * Краткое наименование организации
     */
    short?: string;
}

export interface FluffyStatus {
    /**
     * Дата
     */
    date?: string;
    /**
     * Недействующее
     */
    dissolved?: boolean;
    /**
     * В стадии ликвидации (либо планируется исключение из ЕГРЮЛ)
     */
    dissolving?: boolean;
    /**
     * В процессе реорганизации (может прекратить деятельность в результате реорганизации)
     */
    reorganizing?: boolean;
    /**
     * Неформализованное описание статуса
     */
    statusString?: string;
}

/**
 * Экспресс-отчет по контрагенту
 */
export interface BriefReport {
    /**
     * Сводная информация из экспресс-отчета
     */
    summary?: Summary;
}

/**
 * Сводная информация из экспресс-отчета
 */
export interface Summary {
    /**
     * Наличие информации, помеченной зеленым цветом
     */
    greenStatements?: boolean;
    /**
     * Наличие информации, помеченной красным цветом
     */
    redStatements?: boolean;
    /**
     * Наличие информации, помеченной желтым цветом
     */
    yellowStatements?: boolean;
}

/**
 * Контактные телефоны из Контур.Справочника (для получения контактов требуется отдельная
 * подписка и вызов отдельного метода)
 */
export interface ContactPhones {
    /**
     * Количество найденных контактых телефонов
     */
    count?: number;
}


export interface BriefReport {
    /**
     * Экспресс-отчет по контрагенту
     */
    briefReport?: BriefReportObject;
    /**
     * Ссылка на карточку юридического лица (ИП) в Контур.Фокусе (для работы требуется подписка
     * на Контур.Фокус и дополнительная авторизация)
     */
    focusHref?: string;
    /**
     * ИНН
     */
    inn?: string;
    /**
     * ОГРН
     */
    ogrn?: string;
}

/**
 * Экспресс-отчет по контрагенту
 */
export interface BriefReportObject {
    /**
     * Индивидуальная разовая ссылка на экспресс-отчет в Контур.Фокусе
     */
    href?: string;
    /**
     * Сводная информация из экспресс-отчета
     */
    summary?: Summary;
}

/**
 * Сводная информация из экспресс-отчета
 */
export interface Summary {
    /**
     * Наличие информации, помеченной зеленым цветом
     */
    greenStatements?: boolean;
    /**
     * Наличие информации, помеченной красным цветом
     */
    redStatements?: boolean;
    /**
     * Наличие информации, помеченной желтым цветом
     */
    yellowStatements?: boolean;
}


/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type OrganizationContact = {
    /**
     * ИНН(ИП)
     */
    inn?: string;
    /**
     * ОГРН(ИП)
     */
    ogrn?: string;
    /**
     * Ссылка на карточку юридического лица (ИП) в Контур.Фокусе (для работы требуется подписка на Контур.Фокус и дополнительная авторизация)
     */
    focusHref?: string;
    /**
     * Контактные телефоны из Контур.Справочника (для получения контактов требуется отдельная подписка и вызов отдельного метода)
     */
    contactPhones?: {
      /**
       * Количество найденных контактых телефонов
       */
      count?: number;
      /**
       * Список номеров телефонов
       */
      phones?: string[];
      [k: string]: unknown;
    };
    [k: string]: unknown;
};

export type OrganizationSite = {
  /**
   * ИНН(ИП)
   */
  inn?: string;
  /**
   * ОГРН(ИП)
   */
  ogrn?: string;
  /**
   * Ссылка на карточку юридического лица (индивидуального предпринимателя) в Контур.Фокусе (для работы требуется подписка на Контур.Фокус и дополнительная авторизация)
   */
  focusHref?: string;
  /**
   * Список потенциальных сайтов компании
   */
  sites?: string[];
  [k: string]: unknown;
}