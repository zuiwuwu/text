package sp.szpt.grfz.model;
import org.springframework.util.StringUtils;


import sp.szpt.common.SPExtSearchInfoNew;

public class UserRoleSearchInfo extends SPExtSearchInfoNew{

	
public String fuzzy;
	
	@Override
	protected void onAnalyzeCondition() {
		// TODO Auto-generated method stub
		if(!StringUtils.isEmpty(fuzzy))
		{
			String[] arrayStrings = fuzzy.split(" ");
			for (int i = 0; i < arrayStrings.length; i++) {
				if(!StringUtils.isEmpty(arrayStrings[i].trim()))
				{
					String filter = String.format("%%%s%%", arrayStrings[i]);
					String buffer = String.format("(ROLENAME LIKE '%s' )", filter);
					this.AddCondition(buffer);
							
				}
			}
		}
		
		
		
		
	}
	
	
	
	
	
	
}
