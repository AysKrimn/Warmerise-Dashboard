export const get_profile_data = ($: cheerio.Root, profileHTML: cheerio.Cheerio) => {

    interface Group {
        name: string;
        href: string;
    }


    interface Badge {
        name: string;
        href: string;
    }

    interface ProfileData {
        username: string | null;
        image: string | null;
        rankRef: string | null;
        rank: string | null;
        kills: string | null;
        deaths: string | null;
        kdr: string | null;
        hk: string | null;
        xp: string | null;
        groups: Group[] | null,
        badges: Badge[] | null,
        createdAt: string
    }

    const data: ProfileData = {

        username: null,
        image: null,
        rankRef: null,
        rank: null,
        kills: null,
        deaths: null,
        kdr: null,
        hk: null,
        xp: null,
        groups: null,
        badges: null,
        createdAt: ""
    };

    const profileName = $("#profile_status h2").text().trim();

    profileHTML.each(function(idx, li) {

        
        let query = ".this_year"
        let imagePath = $(li).find('img').attr('src'); 
        let rankRef = $(query + " td").not('id').find('a').attr('href');

        if (rankRef) {

            rankRef = `${process.env['TARGET_ENDPOINT']}${rankRef}`
        }

        query += " .row-title";

        const rank: string | undefined = $(query).filter(function(this: cheerio.Cheerio) {
            return $(this).text().trim() === 'Rank';
        }).next().text().trim();


        const kills: string | undefined = $(query).filter(function(this: cheerio.Cheerio) {
            return $(this).text().trim() === 'Kills';
        }).next().text().trim();


        const deaths: string | undefined = $(query).filter(function(this: cheerio.Cheerio) {
            return $(this).text().trim() === 'Deaths';
        }).next().text().trim();

        
        const kdr: string | undefined = $(query).filter(function(this: cheerio.Cheerio) {
            return $(this).text().trim() === 'KDR';
        }).next().text().trim();

        
        const hk: string | undefined = $(query).filter(function(this: cheerio.Cheerio) {
            return $(this).text().trim() === 'Highest Killstreak';
        }).next().text().trim();

        const xp: string = $(query).filter(function (this: cheerio.Element) {
            return $(this).text().trim() === 'XP';
          
        }).next().text().trim();
   



        let clans = [];

        $('#profile_groups > li').each((i, element) => {
    
        const c_name = $(element).find('.groups_profile_tab_title').find('a').text();
        const c_link = $(element).find('.groups_profile_tab_title').find('a').attr('href');
        
        clans.push({

            clan: c_name,
            clanHref: `${process.env["TARGET_ENDPOINT"]}${c_link}`
        });
    
        });
    
        if(clans.length) {
      
        let totalClan = null; 
        let pattern = /\d+/g;
    
        const tabs = $('li:contains("Groups")').text().trim();
        const tabContent = tabs.split(' ');
    
         // tabcontent 1. dizin sadece rakamı verir.
         if(tabContent.length == 1) totalClan = tabContent[0].match(pattern);
         if(tabContent.length > 1) totalClan = tabContent[1].match(pattern);
      
    
        if(totalClan && totalClan > 5) clans.push(` ${totalClan - 5} and more.`); 
    
        } else { 
            
            clans.push("Not a member of any clan.");
        }


        const badges = [];

        $(li).find("div[class='badge-wrapper']").each((i, element) => {
    
                const place = $(element).find('a').attr('title');
                const e_link = $(element).find('a').attr('href');
            
                console.log("Event Place ve link:", place, e_link);
            
                badges.push({

                    place: place,
                    href: `${process.env['TARGET_ENDPOINT']}${e_link}`
                });
    
        });



        const created = $(li)
        .find("div[class='generic_layout_container layout_user_profile_info']")
        .find("span[class='timestamp']")
        .last().text();
    
        let date_joined = created;
    
        if(!created) { 
            
            date_joined = "• This profile is private.";
            clans.pop()

         } 


        data.username = profileName
        data.image = `${process.env['TARGET_ENDPOINT']}${imagePath}`
        data.rankRef = rankRef
        data.rank = rank
        data.kills = kills
        data.deaths = deaths
        data.kdr = kdr
        data.hk = hk
        data.xp = xp
        data.groups = clans
        data.badges = badges
        data.createdAt = date_joined
    })


    return data
}