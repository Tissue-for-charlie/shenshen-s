-- Seed Songs
INSERT INTO songs (
        title,
        album,
        cover_url,
        audio_url,
        lyrics,
        release_date
    )
VALUES (
        '大鱼',
        '《大鱼海棠》印象曲',
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=zhou+shen+big+fish+album+cover&image_size=square',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        '海浪无声将夜幕深深淹没...',
        '2016-05-18'
    ),
    (
        '花西子',
        '单曲',
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=zhou+shen+hua+xi+zi+album+cover&image_size=square',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        '西子湖畔...',
        '2020-06-29'
    ),
    (
        '触不可及',
        '电影《触不可及》推广曲',
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=zhou+shen+untouchable+album+cover&image_size=square',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        '我多想在你身旁...',
        '2019-11-08'
    );
-- Seed Awards
INSERT INTO awards (name, category, organization, year, image_url)
VALUES (
        '第27届东方风云榜',
        '年度飞跃歌手',
        '东方风云榜',
        2020,
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=award+trophy+gold&image_size=square'
    ),
    (
        '第28届东方风云榜',
        '最受欢迎男歌手',
        '东方风云榜',
        2021,
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=award+trophy+silver&image_size=square'
    ),
    (
        '2023腾讯音乐榜',
        '年度最佳男歌手',
        '腾讯音乐',
        2023,
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=award+trophy+crystal&image_size=square'
    );
-- Seed Career Events
INSERT INTO career_events (title, description, type, event_date, image_url)
VALUES (
        '《中国好声音》第三季',
        '凭借《欢颜》惊艳全场，正式进入演艺圈。',
        'milestone',
        '2014-07-25',
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=the+voice+china+stage&image_size=landscape_16_9'
    ),
    (
        '《大鱼》发行',
        '凭借极具辨识度的空灵嗓音走红。',
        'milestone',
        '2016-05-18',
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=big+fish+begonia+movie&image_size=landscape_16_9'
    ),
    (
        '《歌手·当打之年》',
        '多次获得单期冠军，展现多变曲风。',
        'variety',
        '2020-02-07',
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=singer+stage+performance&image_size=landscape_16_9'
    );
-- Seed Videos
INSERT INTO videos (
        title,
        description,
        thumbnail_url,
        video_url,
        platform,
        publish_date
    )
VALUES (
        '周深《大鱼》现场版',
        '绝美天籁现场，震撼全场。',
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=zhou+shen+live+performance&image_size=landscape_16_9',
        'https://www.bilibili.com',
        'bilibili',
        '2020-03-01'
    ),
    (
        '周深新歌MV',
        '唯美画质，动人旋律。',
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=zhou+shen+mv+scene&image_size=landscape_16_9',
        'https://www.youtube.com',
        'youtube',
        '2024-01-15'
    );
-- Seed Memes
INSERT INTO memes (title, image_url, tags)
VALUES (
        '震惊',
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=zhou+shen+funny+expression+shocked&image_size=square',
        ARRAY ['可爱', '震惊']
    ),
    (
        '点赞',
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=zhou+shen+giving+thumbs+up&image_size=square',
        ARRAY ['鼓励', '点赞']
    ),
    (
        '笑哭',
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=zhou+shen+laughing+hard&image_size=square',
        ARRAY ['搞笑', '笑哭']
    );