if "%LUMIRA_HOME%" == "" (set LUMIRA_HOME=C:\Program Files\SAP Lumira\Lumira Designer)
if "%TARGET_REPO%" == "" (set TARGET_REPO=C:/temp/p2repo/)

md "%TARGET_REPO%"
 
"%JAVA_HOME%\bin\java.exe" -jar "%LUMIRA_HOME%\plugins\org.eclipse.equinox.launcher_1.4.0.v20161219-1356.jar" -debug -consolelog -nosplash -verbose -application org.eclipse.equinox.p2.publisher.FeaturesAndBundlesPublisher -metadataRepository file:%TARGET_REPO% -artifactRepository file:%TARGET_REPO% -source "%LUMIRA_HOME%" -compress -publishArtifacts

