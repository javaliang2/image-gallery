// 示例图片数据
// 支持图床链接（如：https://images.unsplash.com, https://picsum.photos 等）
const imageData = [
    {
        id: 1,
        title: '日落山景',
        description: '壮丽的山区日落风景，金色光线洒落大地',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        category: 'nature',
        tags: ['风景', '山脉', '日落', '自然']
    },
    {
        id: 2,
        title: '现代建筑',
        description: '城市中心的摩天大楼，体现现代建筑美学',
        url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop',
        category: 'architecture',
        tags: ['建筑', '城市', '摩天大楼', '现代']
    },
    {
        id: 3,
        title: '咖啡厅早餐',
        description: '精致的早餐摆盘，配上香醇的咖啡',
        url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
        category: 'food',
        tags: ['美食', '咖啡', '早餐', '甜点']
    },
    {
        id: 4,
        title: '肖像摄影',
        description: '自然光下的人物肖像，表情生动有神',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
        category: 'people',
        tags: ['人物', '肖像', '摄影', '表情']
    },
    {
        id: 5,
        title: '海滨夕阳',
        description: '夕阳西下，海浪拍打沙滩的诗意时刻',
        url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop',
        category: 'nature',
        tags: ['风景', '海洋', '日落', '沙滩']
    },
    {
        id: 6,
        title: '古建筑群',
        description: '传统建筑艺术的完美展现，饱含历史气息',
        url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop',
        category: 'architecture',
        tags: ['建筑', '古建筑', '历史', '文化']
    },
    {
        id: 7,
        title: '美味披萨',
        description: '刚烤好的热披萨，芝士牵丝诱人食欲',
        url: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
        category: 'food',
        tags: ['美食', '披萨', '意大利菜', '烹饪']
    },
    {
        id: 8,
        title: '家庭聚会',
        description: '温馨的家庭时刻，欢乐的笑容闪耀其中',
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop',
        category: 'people',
        tags: ['人物', '家庭', '聚会', '欢乐']
    },
    {
        id: 9,
        title: '森林小溪',
        description: '清澈的溪水流经翠绿的森林，宁静致远',
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
        category: 'nature',
        tags: ['风景', '森林', '水流', '自然']
    },
    {
        id: 10,
        title: '桥梁建筑',
        description: '跨越河流的壮观桥梁，工程与艺术的结合',
        url: 'https://images.unsplash.com/photo-1484649335335-e83fd17970f5?w=400&h=300&fit=crop',
        category: 'architecture',
        tags: ['建筑', '桥梁', '工程', '景观']
    },
    {
        id: 11,
        title: '美食摆盘',
        description: '高级餐厅的精致盘装，色香味俱全',
        url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
        category: 'food',
        tags: ['美食', '餐饮', '摆盘', '高级']
    },
    {
        id: 12,
        title: '工作团队',
        description: '专业团队在办公室合作的精彩时刻',
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
        category: 'people',
        tags: ['人物', '工作', '团队', '专业']
    },
    {
        id: 13,
        title: '星空美景',
        description: '银河横跨夜空，星光闪闪熠熠生辉',
        url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop',
        category: 'nature',
        tags: ['风景', '星空', '夜景', '天文']
    },
    {
        id: 14,
        title: '办公大楼',
        description: '玻璃幕墙大楼在阳光下熠熠生辉',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
        category: 'architecture',
        tags: ['建筑', '办公', '城市', '商业']
    },
    {
        id: 15,
        title: '甜点诱惑',
        description: '诱人的甜点和新鲜水果的完美组合',
        url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
        category: 'food',
        tags: ['美食', '甜点', '水果', '烘焙']
    },
    {
        id: 16,
        title: '运动健身',
        description: '阳光下的户外运动，展现青春活力',
        url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
        category: 'people',
        tags: ['人物', '运动', '健身', '户外']
    },
    {
        id: 17,
        title: '雪山风景',
        description: '终年积雪的高山，白色世界的壮丽景色',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        category: 'nature',
        tags: ['风景', '山脉', '雪景', '高山']
    },
    {
        id: 18,
        title: '水下结构',
        description: '海底的独特建筑结构，展现人类创意',
        url: 'https://images.unsplash.com/photo-1486946255434-2466348c2166?w=400&h=300&fit=crop',
        category: 'architecture',
        tags: ['建筑', '创意', '结构', '设计']
    },
    {
        id: 19,
        title: '鲜榨果汁',
        description: '五彩缤纷的新鲜果汁，健康又美味',
        url: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
        category: 'food',
        tags: ['美食', '饮品', '果汁', '健康']
    },
    {
        id: 20,
        title: '舞者风采',
        description: '优雅的舞者在舞台上的精彩表演',
        url: 'https://images.unsplash.com/photo-1504942238934-e3f9c44a8eca?w=400&h=300&fit=crop',
        category: 'people',
        tags: ['人物', '舞蹈', '表演', '艺术']
    }
];
