#!/usr/bin/perl
use warnings;
use strict;

die "Usage: \n$0 [NewsKeywordFile.txt]\n" if @ARGV < 1;

# naming all files
my $companiesFile = "companies.txt";
my $searchOutput = "searchTiming.txt";
my $authOutput = "authTiming.txt";
my $finalResults = "timingResults.txt";

# Open input file, clear/create output file
my $newsTopicsFile = $ARGV[0];
open my $fh, "<", $newsTopicsFile or die "Could not open input file $newsTopicsFile\n";

#Authorise user and get token
my $token = `/usr/bin/time --append --output=$authOutput curl --request POST --url http://api.restfulnews.com/auth --header 'content-type: application/json' --data '{ "email": "steven\@restfulnews.com", "password": "accident8" }'`;
$token =~ s/^.+token\":\"(.*?)\".*$/$1/;
die "Invalid token\n" if $token =~ /[\[\{\]\}]\"/;

# Search for every word in the input file as a separate topic
foreach my $line (<$fh>) {
    my @words = split(/[ ,\.\/]/, $line);
    foreach my $topic (@words) {
        chomp $topic;
        my $url = "http://api.restfulnews.com/search?topics=";
        $url .= $topic;
        open my $companies, "<", $companiesFile or die "Couldn't open $companiesFile\n";
        foreach my $company (<$companies>) {
            $company =~s/\r//;
            chomp $company;
            my $fullurl = $url;
            $fullurl .= "&companyids=$company";
            $fullurl =~s/\r//;
            chomp $fullurl;
            $fullurl =~ s/[^\w&\:\/\.\?\=]//;
            $fullurl = lc $fullurl;
            `/usr/bin/time --append --output=$searchOutput curl --request GET --url '$fullurl' --header 'authorization: Bearer $token' --header 'content-type: application/json'`;
        }
    }
}
close $fh;
close $searchOutput;

# collate auth $results
open my $results, "<", $authOutput or die "Failed to open Auth timing results\n";
my $authTime = 0;
foreach my $line (<$results>) {
    if ($line =~ /user.*system.*elapsed/) {
        $line =~ s/^.*(\d+:\d+\.\d+)elapsed.*$/$1/;
        my $min = $line;
        $min =~ s/(\d+):.+$/$1/;
        $min = $min * 60;
        my $sec = $line;
        $sec =~ s/^.*:(\d+.\d+).*$/$1/;
        $sec = $sec + 0;
        $authTime += $min + $sec;
    }
}

# Collate timing results
open my $searchresults, "<", "$searchOutput" or die "Failed to open Search timing results\n";
my $totalSecs = 0;
my $numSearches = 0;
foreach my $line (<$searchresults>) {
    if ($line =~ /user.*system.*elapsed/) {
        $line =~ s/^.*(\d+:\d+\.\d+)elapsed.*$/$1/;
        my $min = $line;
        $min =~ s/(\d+):.+$/$1/;
        $min = $min * 60;
        my $sec = $line;
        $sec =~ s/^.*:(\d+.\d+).*$/$1/;
        $sec = $sec + 0;
        $totalSecs += $min + $sec;
        $numSearches += 1;
    }
}
close $results;

die "===\nMassive error: No timing data reported\n===\n" if $numSearches == 0;

`echo "" > $finalResults`;
open my $frhandler, ">>", $finalResults or die "Could not open final results file\n";
printf $frhandler "Auth time:\n%.2f seconds, 1 test case\n", $authTime;
printf $frhandler "Average Search time:\n%.2f seconds, $numSearches test cases\n", $totalSecs/$numSearches, $numSearches;
close $frhandler;

`rm GLOB* $searchOutput $authOutput`;
print "All cleaned up!\n";
